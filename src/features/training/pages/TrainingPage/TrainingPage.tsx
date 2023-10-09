import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./TrainingPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/Logo.svg"
import {Button} from "../../../../components/Button";
import {Card} from "../../../../components/Card";
import {Typography} from "../../../../components/Typography";
import {useNavigate} from "react-router-dom";
import {clsx} from "clsx";
import {TaskContinue} from "../../../../components/TaskContinue";
import {ProgressBar} from "../../../../components/ProgressBar";
import {PageContent} from "../../../../components/PageContent";
import ResultImage from "../../../../assets/images/ResultTrainingImage.svg";
import {RecognitionBlock} from "../../components/RecognitionBlock";
import Result from "../../../../assets/images/Result.svg";
import {ResultCard} from "../../components/ResultCard";
import {getFireworks} from "../../../../core/utils/explodeFireworks";
import {ExitConfirmation} from "../../../../components/ExitConfirmation";
import {StartThemeWords} from "../../../../core/data";
import {shuffleArray} from "../../../../core/utils/shuffleArray";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import GitHubLogo from "../../../../assets/images/GitHubLogo.svg"
import {stopAllTracks} from "../../../../core/utils/stopAllTracks";

export const TrainingPage: FC = typedMemo(function TrainingPage() {
    const navigate = useNavigate()
    const fireworks = getFireworks(3000)

    const [data] = useState(shuffleArray(StartThemeWords));
    const [signRecognizeText, setSignRecognizeText] = useState<string[]>([])
    const [exitModalIsOpen, setExitModalIsOpen] = useState(false)
    const [countSkippedWords, setCountSkippedWords] = useState(0);
    const [isDoneTask, setIsDoneTask] = useState(false);
    const [intervalID, setIntervalID] = useState<TimeoutId>()
    const [currentStep, setCurrentStep] = useState(-1)

    const getTaskResult = () => 100 - Math.floor((countSkippedWords) / data.length * 100)
    const clearRecognizeText = () => setSignRecognizeText([])

    const toMainPage = useCallback(() => navigate("/"), [])

    const skip = useCallback(() => {
        setCurrentStep(currentStep => currentStep + 1)
        setCountSkippedWords(count => count + 1);
        clearRecognizeText()
    }, [setCountSkippedWords, setCurrentStep]);

    const next = useCallback(() => {
        setCurrentStep(currentStep => currentStep + 1)
        setIsDoneTask(false);
        clearRecognizeText()
    }, [setCurrentStep, setIsDoneTask])

    useEffect(() => {
        if (currentStep === data.length && countSkippedWords !== data.length)
            fireworks()
    }, [currentStep, countSkippedWords, data.length, fireworks]);

    return (
        <Page>
            <ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen}/>
            <PageContent className={styles.trainingTask}>
                <div className={styles.trainingTask__logoContainer} onClick={toMainPage}>
                    <img src={Logo} rel="preload" alt={"Логотип"} width={230}/>
                </div>
                {
                    currentStep !== -1 &&
                    <div className={styles.trainingTask__progressBarContainer}>
                        <ProgressBar currentStep={currentStep - 1} stepCount={data.length}/>
                    </div>
                }
                <div className={styles.trainingTask__exitButtonContainer}>
                    {
                        currentStep !== data.length &&
                        <Button
                            variant={"faded"}
                            color={"default"}
                            size={"lg"}
                            onClick={() => setExitModalIsOpen(true)}
                        >
                            В главное меню
                        </Button>
                    }
                </div>


                <div className={styles.trainingTask__taskContainer}>
                    {
                        currentStep === -1 &&
                        (
                            <Card className={clsx(styles.trainingTask__startCard, styles.trainingTask__startAnimation)}>
                                <Typography variant={"h2"}>
                                    Начало тренировки
                                </Typography>
                                <Typography variant={"p"} className={styles.trainingTask__startCardDescription}>
                                    Вам будут предложены слова, которое вы должны показать в камеру.
                                    Наша система распознает ваш жест и отобразит слово зелёным цветом.
                                    После успешного выполнения перейдите к следующему слову.
                                </Typography>

                                <Button variant={"solid"} color={"primary"}
                                        onClick={() => setCurrentStep(0)}
                                        size={"lg"}
                                >
                                    Начать прохождение
                                </Button>
                            </Card>
                        )
                    }
                    {
                        currentStep >= 0 && currentStep <= data.length - 1 &&
                        <RecognitionBlock
                            word={data[currentStep]}
                            className={styles.trainingTask__recognition}
                            onSuccess={() => setIsDoneTask(true)}
                            setIntervalID={setIntervalID}
                            intervalID={intervalID}
                            signRecognizeText={signRecognizeText}
                            setSignRecognizeText={setSignRecognizeText}
                        />
                    }
                    {
                        currentStep === data.length &&
                        <div className={styles.trainingTask__result}>
                            <img
                                src={ResultImage}
                                rel="preload"
                                className={styles.trainingTask__resultImage}
                                alt="Иконка результата"
                            />
                            <Typography variant="h2" className={styles.trainingTask__resultTitle}>
                                Конец тренировки!
                            </Typography>
                            <ResultCard
                                title="Результат"
                                iconUrl={Result}
                                content={`${getTaskResult()}%`}
                                className={styles.trainingTask__resultCard}/>
                        </div>
                    }
                </div>

                <div className={styles.trainingTask__buttonsContainer}>
                    {
                        currentStep >= 0 && currentStep <= data.length - 1 && !isDoneTask &&
                        <Button
                            size={"lg"}
                            variant="faded"
                            onClick={skip}
                        >
                            Пропустить
                        </Button>
                    }
                </div>

                <div className={styles.trainingTask__taskContinueContainer}>
                    {
                        isDoneTask &&
                        <TaskContinue next={next} isRightAnswer={true}/>
                    }
                    {
                        currentStep === data.length &&
                        <div className={styles.trainingTask__toHome}>
                            <Button
                                size={'lg'}
                                color="primary"
                                onClick={toMainPage}
                            >
                                В главное меню
                            </Button>
                        </div>
                    }
                </div>


                {
                    currentStep === -1 &&
                    <Card className={styles.trainingTask__warning__container}>
                        <Typography variant={"h3"} className={styles.trainingTask__warning__title}>
                            Предупреждение
                        </Typography>
                        <Typography variant={"p"} className={styles.trainingTask__warning__description}>
                            Распознавание работает только при запущенной на локальной машине модели распознавания <br/>чтобы развернуть её следуйте
                            инструкции в Readme.md данного репозитория:
                            <div className={styles.trainingTask__warning__gitLink}>
                                <img src={GitHubLogo} alt="GitHub логотип" />
                                <a
                                    href={"https://github.com/CatDevelop/Teaching-RSL/tree/88_exhibition_stand__dev"}
                                    target={"_blank"}
                                >
                                    Teaching-RSL
                                </a>
                            </div>
                        </Typography>
                    </Card>
                }
            </PageContent>
        </Page>
    )
})
