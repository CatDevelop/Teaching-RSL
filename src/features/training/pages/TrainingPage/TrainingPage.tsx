import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./TrainingPage.module.css";
import {Page} from "../../../../components/Page";
import {ReactComponent as Logo} from "../../../../assets/images/Logo.svg"
import {Button} from "../../../../components/Button";
import {useNavigate, useParams} from "react-router-dom";
import {PageContent} from "../../../../components/PageContent";
import {RecognitionBlock} from "../../components/RecognitionBlock";
import {ExitConfirmation} from "../../../../components/ExitConfirmation";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import {useMutation, useQuery} from "react-query";
import {TrainingService} from "../../../../api/services/training";
import {ModelWarning} from "../../components/ModelWarning/ModelWarning";
import {socket} from "../../../../core/utils/connectToModal";
import {LearningHeader} from "../../../learning/components/LearningHeader";
import {toast} from "react-toastify";
import {Back} from "../../../../components/Back";
import {UserHistoryService} from "../../../../api/services/userHistory";

export type Props = {}

export const TrainingPage: FC<Props> = typedMemo(function TrainingPage() {
    const navigate = useNavigate()
    const {id} = useParams<{ id: string }>();
    const {data: training} = useQuery(['training/gettest', id], () => id === 'reflection' ?
        TrainingService.getUserTestReflection() :
        TrainingService.getTraining(id ?? '')
    );
    const [signRecognizeText, setSignRecognizeText] = useState<string[]>([])
    const [exitModalIsOpen, setExitModalIsOpen] = useState(false)
    const [countSkippedWords, setCountSkippedWords] = useState(0);
    const [isDoneTask, setIsDoneTask] = useState(false);
    const [intervalID, setIntervalID] = useState<TimeoutId>()
    const [currentStep, setCurrentStep] = useState(0)
    const [isNotStartModel, setIsNotStartModel] = useState(false)
    const [incorrectWords, setIncorrectWords] = useState<string[]>([])

    const clearRecognizeText = () => setSignRecognizeText([])

    const openExitModal = useCallback(() => setExitModalIsOpen(true), [setExitModalIsOpen])
    const toTrainingPage = useCallback(() => navigate("/training"), [navigate])

    const {mutate: sendResult} = useMutation(
        ['userhistory/sendtestresult', id],
        (incorrectWords: string[]) => UserHistoryService.sendTestResult(
            {testId: id || "", incorrectWords: incorrectWords}
        )
    )

    const skip = useCallback(() => {
        training && setIncorrectWords([...incorrectWords, training.words[currentStep].id])
        if (currentStep + 1 === training?.words.length) {
            sendResult([...incorrectWords, training.words[currentStep].id])
            navigate("result/?skiped=" + (countSkippedWords + 1) + "&all=" + training.words.length)
        }
        setCurrentStep(currentStep => currentStep + 1)
        setCountSkippedWords(count => count + 1);
        clearRecognizeText()
    }, [setCountSkippedWords, setCurrentStep, currentStep, training, countSkippedWords, incorrectWords]);

    const next = useCallback(() => {
        if (currentStep + 1 === training?.words.length) {
            sendResult(incorrectWords)
            navigate("result/?skiped=" + countSkippedWords + "&all=" + training.words.length)
        }
        setCurrentStep(currentStep => currentStep + 1)
        setIsDoneTask(false);
        clearRecognizeText()
    }, [setCurrentStep, setIsDoneTask, currentStep, training, countSkippedWords])

    useEffect(() => {
        socket.on('connect_error', () => setIsNotStartModel(true))
        socket.on('connect_failed', () => setIsNotStartModel(true))
        socket.on('connect', () => setIsNotStartModel(false))
    }, []);

    if (!training) {
        return null
    }
    return (
        <Page>
            <ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen} onExit={toTrainingPage}/>
            <PageContent className={styles.trainingTask}>
                <div className={styles.trainingTask__logoContainer} onClick={openExitModal}>
                    <Logo width={218} className={styles.trainingTask__logoIcon}/>
                </div>
                <div className={styles.trainingTask__contentContainer}>
                    {
                        !isNotStartModel &&
                        <LearningHeader
                            type="test"
                            name={training.testName}
                            currentStep={currentStep}
                            stepCount={training.words.length}
                        />
                    }
                    {
                        !isNotStartModel &&
                        <div className={styles.trainingPage__recognitionContainer}>
                            <div className={styles.trainingPage__back}>
                                <Back to="/training" type="icon"/>
                            </div>
                            <RecognitionBlock
                                word={training.words[currentStep]}
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
