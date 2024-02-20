import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, Suspense, useCallback, useState} from "react";
import styles from "./LearningTaskPage.module.css";
import {Page} from "../../../../components/Page";
import {ReactComponent as Logo} from "../../../../assets/images/LogoMonochrome.svg"
import {useNavigate, useParams} from "react-router-dom";
import {clsx} from "clsx";
import {PageContent} from "../../../../components/PageContent";
import {ExitConfirmation} from "../../../../components/ExitConfirmation";
import {LearningHeader} from "../../components/LearningHeader";
import {LearningTaskBlock} from "../../components/LearningTaskBlock";
import {Spinner} from "@nextui-org/react";
import {Back} from "../../../../components/Back";
import useLearningLevel from "../../../../core/hooks/use-learning-level";
import {useMutation} from "react-query";
import {UserHistoryService} from "../../../../api/services/userHistory";

/**
 * Задания уровня обучения
 */
export const LearningTaskPage: FC = typedMemo(function LearningTaskPage() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate()

    const levelController = useLearningLevel(id || '')

    const [currentStep, setCurrentStep] = useState(0)
    const [exitModalIsOpen, setExitModalIsOpen] = useState(false)
    const [rightWords, setRightWords] = useState<string[]>([])
    const tasks = levelController.level.tasks
    const theoryCount = levelController.level.theoryCount;
    const practiceCount = levelController.level.practiceCount;

    const sendResult = useMutation(
        ['userhistory/sendlevelresult', id],
        () => UserHistoryService.sendLevelResult(
            {
                levelId: id || "", completedWords: rightWords
            }
        )
    )

    const nextStep = useCallback(() => {
        if (currentStep + 1 === theoryCount + practiceCount) {
            sendResult.mutate()
            navigate("result/?count=" + theoryCount)
        }
        setCurrentStep(currentStep + 1)
    }, [currentStep, setCurrentStep, theoryCount, practiceCount])

    const prevStep = useCallback(() => {
        setCurrentStep(currentStep - 1)
    }, [currentStep, setCurrentStep])

    const openExitModal = useCallback(() => setExitModalIsOpen(true), [setExitModalIsOpen])
    const toLearningPage = useCallback(() => navigate("/learning"), [navigate])

    if (levelController.isLoading)
        return <Spinner/>

    return (
        <Suspense fallback={<Spinner/>}>
            <Page>
                <ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen} onExit={toLearningPage}/>
                <PageContent className={styles.learningTask}>
                    <div className={styles.learningTask__logoContainer} onClick={openExitModal}>
                        <Logo width={218} className={styles.learningTask__logoIcon}/>
                    </div>

                    <div className={styles.learningTask__contentContainer}>
                        <LearningHeader
                            type={tasks[currentStep].type}
                            name={levelController.level?.name}
                            currentStep={currentStep}
                            stepCount={tasks.length}
                        />
                        <div className={styles.learningTask__taskContainer}>

                            <div className={
                                clsx(
                                    styles.learningTask__theory,
                                    styles.learningTask__startAnimation,
                                    tasks[currentStep]?.task?.type === "MatchWordAndGif" && styles.learningTask__short
                                )}
                            >
                                <LearningTaskBlock
                                    task={tasks[currentStep]}
                                    currentStep={currentStep}
                                    nextStep={nextStep}
                                    prevStep={prevStep}
                                    rightWords={rightWords}
                                    setRightWords={setRightWords}
                                />
                                <div className={styles.learningTask__back}>
                                    <Back to="/learning" type="icon"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </PageContent>
            </Page>
        </Suspense>
    )
})
