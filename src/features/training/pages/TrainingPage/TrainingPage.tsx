import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./TrainingPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/Logo.svg"
import {Button} from "../../../../components/Button";
import {Typography} from "../../../../components/Typography";
import {useNavigate, useParams} from "react-router-dom";
import {TaskContinue} from "../../../../components/TaskContinue";
import {ProgressBar} from "../../../../components/ProgressBar";
import {PageContent} from "../../../../components/PageContent";
import {RecognitionBlock} from "../../components/RecognitionBlock";
import {getFireworks} from "../../../../core/utils/explodeFireworks";
import {ExitConfirmation} from "../../../../components/ExitConfirmation";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import {useQuery} from "react-query";
import {TrainingService} from "../../../../api/services/training";
import {StartTraining} from "../../components/StartTraining/StartTraining";
import {ModelWarning} from "../../components/ModelWarning/ModelWarning";
import {socket} from "../../../../core/utils/connectToModal";
import {BySberAI} from "../../../../components/BySberAI";

export const TrainingPage: FC = typedMemo(function TrainingPage() {
    const navigate = useNavigate()
    const fireworks = getFireworks(3000)
    const {id} = useParams<{id: string}>();
    const {data} = useQuery(['training/gettest', id], () => TrainingService.getTraining(id ?? ''));

    const [signRecognizeText, setSignRecognizeText] = useState<string[]>([])
    const [exitModalIsOpen, setExitModalIsOpen] = useState(false)
    const [countSkippedWords, setCountSkippedWords] = useState(0);
    const [isDoneTask, setIsDoneTask] = useState(false);
    const [intervalID, setIntervalID] = useState<TimeoutId>()
    const [currentStep, setCurrentStep] = useState(-1)
    const [isNotStartModel, setIsNotStartModel] = useState(false)

    const getTaskResult = useCallback(() => {
        if(!data){
            return 0
        }
        return 100 - Math.floor((countSkippedWords) / data.words.length * 100)
    }, [data, countSkippedWords])

    const clearRecognizeText = () => setSignRecognizeText([])

    const openExitModal = useCallback(() => setExitModalIsOpen(true), [setExitModalIsOpen])
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
        socket.on('connect_error', () => setIsNotStartModel(true))
        socket.on('connect_failed', () => setIsNotStartModel(true))
        socket.on('connect', () => setIsNotStartModel(false))
    }, []);

    useEffect(() => {
        if(!data){
            return;
        }
        if (currentStep === data.words.length && countSkippedWords !== data.words.length)
            fireworks()
    }, [currentStep, countSkippedWords, data, fireworks]);

    useEffect(() => {
        socket.on('connect_error', () => setIsNotStartModel(true))
        socket.on('connect_failed', () => setIsNotStartModel(true))
        socket.on('connect', () => setIsNotStartModel(false))
    }, []);


    if(!data){
        return null
    }
    return (
        <Page>
            <ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen}/>
            <PageContent className={styles.trainingTask}>
                <div className={styles.trainingTask__header}>
                    <div className={styles.trainingTask__logoContainer} onClick={openExitModal}>
                        <img src={Logo} rel="preload" alt={"Логотип"} width={230}/>
                        {/*<BySberAI/>*/}
                    </div>
                    {
                        currentStep !== -1 && currentStep !== data.words.length && !isNotStartModel &&
                        <div className={styles.trainingTask__progressBarContainer}>
                            <ProgressBar currentStep={currentStep - 1} stepCount={data.words.length}/>
                        </div>
                    }
                    <div className={styles.trainingTask__exitButtonContainer}>
                        {
                            currentStep !== data.words.length &&
                            <Button
                                variant={"faded"}
                                color={"default"}
                                size={"lg"}
                                onClick={openExitModal}
                            >
                                В главное меню
                            </Button>
                        }
                    </div>
                </div>

                {currentStep !== data.words.length && <BySberAI className={styles.trainingTask__bySberAI}/>}


                <div className={styles.trainingTask__taskContainer}>
                    {
                        currentStep === -1 &&
                        <StartTraining onStart={() => setCurrentStep(0)}/>
                    }
                    {
                        currentStep >= 0 && currentStep <= data.words.length - 1 && !isNotStartModel &&
                        <RecognitionBlock
                            word={data.words[currentStep]}
                            className={styles.trainingTask__recognition}
                            onSuccess={() => setIsDoneTask(true)}
                            setIntervalID={setIntervalID}
                            intervalID={intervalID}
                            signRecognizeText={signRecognizeText}
                            setSignRecognizeText={setSignRecognizeText}
                        />
                    }
                    {
                        currentStep >= 0 && currentStep <= data.words.length - 1 && isNotStartModel &&
                        <div className={styles.trainingPage__warningContainer}>
                            <ModelWarning/>
                        </div>
                    }
                    {
                        currentStep === data.words.length &&
                        <div className={styles.trainingTask__result}>
                            {/*<img*/}
                            {/*    src={ResultImage}*/}
                            {/*    rel="preload"*/}
                            {/*    className={styles.trainingTask__resultImage}*/}
                            {/*    alt="Иконка результата"*/}
                            {/*/>*/}
                            <Typography variant="h2" className={styles.trainingTask__resultTitle}>
                                Поздравляем, вы освоили несколько новых жестов!<br/>Благодарим за участие!
                            </Typography>
                            <div className={styles.trainingTask__result__container}>
                                <BySberAI/>
                                {/*<ResultCard*/}
                                {/*    title="Результат"*/}
                                {/*    iconUrl={Result}*/}
                                {/*    content={`${getTaskResult()}%`}*/}
                                {/*    className={styles.trainingTask__resultCard}/>*/}
                            </div>
                        </div>
                    }
                </div>

                <div className={styles.trainingTask__buttonsContainer}>
                    {
                        currentStep >= 0 && currentStep <= data.words.length - 1 && !isDoneTask && !isNotStartModel &&
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
                        currentStep === data.words.length &&
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
                    currentStep === -1 && isNotStartModel &&
                    <ModelWarning className={styles.trainingPage__warning}/>
                }
            </PageContent>
        </Page>
    )
})
