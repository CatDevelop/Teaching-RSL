import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./TrainingPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/Logo.svg"
import {Button} from "../../../../components/Button";
import {Typography} from "../../../../components/Typography";
import {useNavigate} from "react-router-dom";
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
import {StartTraining} from "../../components/StartTraining/StartTraining";

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

    const toMainPage = useCallback(() => navigate("/"), [navigate])

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
                        <StartTraining onStart={() => setCurrentStep(0)}/>
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
            </PageContent>
        </Page>
    )
})
