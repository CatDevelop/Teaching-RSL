import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./TrainingPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/Logo.svg"
import {Button} from "../../../../components/Button";
import {useNavigate, useParams} from "react-router-dom";
import {PageContent} from "../../../../components/PageContent";
import {RecognitionBlock} from "../../components/RecognitionBlock";
import {ExitConfirmation} from "../../../../components/ExitConfirmation";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import {useQuery} from "react-query";
import {TrainingService} from "../../../../api/services/training";
import {ModelWarning} from "../../components/ModelWarning/ModelWarning";
import {socket} from "../../../../core/utils/connectToModal";
import {LearningHeader} from "../../../learning/components/LearningHeader";
import {toast} from "react-toastify";
import {Back} from "../../../../components/Back";

export const TrainingPage: FC = typedMemo(function TrainingPage() {
    const navigate = useNavigate()
    const {id} = useParams<{ id: string }>();
    const {data} = useQuery(['training/gettest', id], () => TrainingService.getTraining(id ?? ''));

    const [signRecognizeText, setSignRecognizeText] = useState<string[]>([])
    const [exitModalIsOpen, setExitModalIsOpen] = useState(false)
    const [countSkippedWords, setCountSkippedWords] = useState(0);
    const [isDoneTask, setIsDoneTask] = useState(false);
    const [intervalID, setIntervalID] = useState<TimeoutId>()
    const [currentStep, setCurrentStep] = useState(0)
    const [isNotStartModel, setIsNotStartModel] = useState(false)

    const clearRecognizeText = () => setSignRecognizeText([])

    const openExitModal = useCallback(() => setExitModalIsOpen(true), [setExitModalIsOpen])
    const toTrainingPage = useCallback(() => navigate("/training"), [navigate])

    const skip = useCallback(() => {
        if (currentStep + 1 === data?.words.length) {
            navigate("result/?skiped=" + countSkippedWords+1 + "&all=" + data.words.length)
        }
        setCurrentStep(currentStep => currentStep + 1)
        setCountSkippedWords(count => count + 1);
        clearRecognizeText()
    }, [setCountSkippedWords, setCurrentStep, currentStep, data, countSkippedWords]);

    const next = useCallback(() => {
        if (currentStep + 1 === data?.words.length) {
            navigate("result/?skiped=" + countSkippedWords + "&all=" + data.words.length)
        }
        setCurrentStep(currentStep => currentStep + 1)
        setIsDoneTask(false);
        clearRecognizeText()
    }, [setCurrentStep, setIsDoneTask, currentStep, data, countSkippedWords])

    useEffect(() => {
        socket.on('connect_error', () => setIsNotStartModel(true))
        socket.on('connect_failed', () => setIsNotStartModel(true))
        socket.on('connect', () => setIsNotStartModel(false))
    }, []);

    useEffect(() => {
        if (!data) {
            return;
        }
    }, [data]);

    if (!data) {
        return null
    }

    return (
        <Page>
            <ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen} onExit={toTrainingPage}/>
            <PageContent className={styles.trainingTask}>
                <div className={styles.trainingTask__logoContainer} onClick={openExitModal}>
                    <img src={Logo} rel="preload" alt={"Логотип"} width={218}/>
                </div>
                <div className={styles.trainingTask__contentContainer}>
                    {
                        !isNotStartModel &&
                        <LearningHeader
                            type="test"
                            name={data.testName}
                            currentStep={currentStep}
                            stepCount={data.words.length}
                        />
                    }
                    {
                        !isNotStartModel &&
                        <div className={styles.trainingPage__recognitionContainer}>
                            <div className={styles.trainingPage__back}>
                                <Back to="/training" type="icon"/>
                            </div>
                            <RecognitionBlock
                                word={data.words[currentStep]}
                                className={styles.trainingTask__recognition}
                                onSuccess={() => {
                                    setIsDoneTask(true)
                                    toast.success("Вы отлично справились!")
                                }}
                                setIntervalID={setIntervalID}
                                intervalID={intervalID}
                                signRecognizeText={signRecognizeText}
                                setSignRecognizeText={setSignRecognizeText}
                                buttons={<div className={styles.trainingTask__buttonsContainer}>
                                    {
                                        !isNotStartModel && isDoneTask ?
                                            <Button
                                                size={"lg"}
                                                variant="faded"
                                                color="primary"
                                                onClick={next}
                                            >
                                                Далее
                                            </Button> :
                                            <Button
                                                size={"lg"}
                                                variant="faded"
                                                onClick={skip}
                                            >
                                                Пропустить
                                            </Button>
                                    }
                                </div>}
                            />
                        </div>
                    }
                    {
                        isNotStartModel &&
                        <div className={styles.trainingPage__warningContainer}>
                            <ModelWarning/>
                        </div>
                    }
                </div>
            </PageContent>
        </Page>
    )
})
