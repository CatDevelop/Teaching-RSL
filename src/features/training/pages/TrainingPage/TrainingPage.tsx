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
                <div className={styles.trainingTask__logoContainer} onClick={() => {
                    clearInterval(intervalID)
                    navigate("/")
                }}>
                    <img src={Logo} alt={"Логотип"} width={230}/>
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
                            <img src={ResultImage} className={styles.trainingTask__resultImage}
                                 alt="Иконка результата"/>
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
                                onClick={() => {
                                    clearInterval(intervalID)
                                    navigate("/")
                                }}
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
                                <svg width={20} height={20} viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M7.49936 0.850006C3.82767 0.850006 0.849976 3.8273 0.849976 7.50023C0.849976 10.4379 2.75523 12.9306 5.39775 13.8104C5.73047 13.8712 5.85171 13.6658 5.85171 13.4895C5.85171 13.3315 5.846 12.9135 5.84273 12.3587C3.99301 12.7604 3.60273 11.4671 3.60273 11.4671C3.30022 10.6988 2.86423 10.4942 2.86423 10.4942C2.26044 10.0819 2.90995 10.0901 2.90995 10.0901C3.57742 10.137 3.9285 10.7755 3.9285 10.7755C4.52167 11.7916 5.48512 11.4981 5.86396 11.3279C5.92438 10.8984 6.09625 10.6053 6.28608 10.4391C4.80948 10.2709 3.25695 9.70063 3.25695 7.15241C3.25695 6.42615 3.51618 5.83298 3.94157 5.368C3.87299 5.1998 3.64478 4.52375 4.00689 3.60807C4.00689 3.60807 4.56494 3.42926 5.83538 4.28941C6.36568 4.14204 6.93477 4.06856 7.50018 4.0657C8.06518 4.06856 8.63386 4.14204 9.16498 4.28941C10.4346 3.42926 10.9918 3.60807 10.9918 3.60807C11.3548 4.52375 11.1266 5.1998 11.0584 5.368C11.4846 5.83298 11.7418 6.42615 11.7418 7.15241C11.7418 9.70716 10.1868 10.2693 8.70571 10.4338C8.94412 10.6392 9.15681 11.045 9.15681 11.6655C9.15681 12.5542 9.14865 13.2715 9.14865 13.4895C9.14865 13.6675 9.26867 13.8745 9.60588 13.8095C12.2464 12.9282 14.15 10.4375 14.15 7.50023C14.15 3.8273 11.1723 0.850006 7.49936 0.850006Z"
                                        fill="#000000"
                                    />
                                </svg>
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
