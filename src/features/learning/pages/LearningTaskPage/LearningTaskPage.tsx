import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./LearningTaskPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/Logo.svg"
import {shuffleArray} from "../../../../core/utils/shuffleArray";
import {StartThemeTasks, StartThemeWords} from "../../../../core/data";
import {Button} from "../../../../components/Button";
import {TheoryCard} from "../../components/TheoryCard";
import {Typography} from "../../../../components/Typography";
import {useNavigate} from "react-router-dom";
import {clsx} from "clsx";
import {TaskContinue} from "../../../../components/TaskContinue";
import {StepStatus} from '../../../../core/models/StepStatus';
import {ProgressBar} from "../../../../components/ProgressBar";
import {PageContent} from "../../../../components/PageContent";
import ResultImage from "../../../../assets/images/ResultLearningImage.svg";
import {getFireworks} from "../../../../core/utils/explodeFireworks";
import {ExitConfirmation} from "../../../../components/ExitConfirmation";
import {PracticeCards} from "../../components/PracticeCards";
import {StartLearning} from "../../components/StartLearning";
import {generateTasks} from "../../../../core/utils/generateTasks";
import {TasksType} from "../../../../core/models/Tasks";
import {Word} from "../../../../core/models/Word";
import {LearningHeader} from "../../components/LearningHeader";
import {LearningTaskBlock} from "../../components/LearningTaskBlock";

enum taskType {
    THEORY = "theory",
    PRACTICE = "practice"
}

// TODO написать нормальные типы
type task = {
    id: number,
    task: any,
    type: taskType
}

export const LearningTaskPage: FC = typedMemo(function LearningTaskPage() {
    const navigate = useNavigate()
    const fireworks = getFireworks(3000)
    const theoryCount = 5;
    const practiceCount = 4;

    // -1 - стартовая плашка
    // 0-(theoryCount-1) - теория
    // (theoryCount)-(theoryCount+practiceCount-1) - практика
    const [currentStep, setCurrentStep] = useState(-1)

    const [exitModalIsOpen, setExitModalIsOpen] = useState(false)

    const [tasks] = useState<task[]>([
        ...shuffleArray<Word>(StartThemeWords).map((wordObject, index) => ({
            id: index,
            task: {
                wordObject
            },
            type: taskType.THEORY
        })),
        ...shuffleArray<TasksType>(generateTasks(StartThemeWords, StartThemeTasks)).map((task, index) => ({
            id: index + 5,
            task,
            type: taskType.PRACTICE
        }))
    ])

    useEffect(() => {
        if (currentStep === theoryCount + practiceCount)
            fireworks()
    }, [currentStep, fireworks]);

    const nextStep = useCallback(() => {
        setCurrentStep(currentStep + 1)
    }, [currentStep, setCurrentStep])

    const prevStep = useCallback(() => {
        setCurrentStep(currentStep - 1)
    }, [currentStep, setCurrentStep])

    const openExitModal = useCallback(() => setExitModalIsOpen(true), [setExitModalIsOpen])
    const toMainPage = useCallback(() => navigate("/"), [navigate])
    const toTrainingPage = useCallback(() => navigate("/training"), [navigate])

    return (
        <Page>
            <ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen}/>
            <PageContent className={styles.learningTask}>
                <div className={styles.learningTask__logoContainer} onClick={openExitModal}>
                    <img src={Logo} rel="preload" alt="Логотип" width={218}/>
                </div>

                <div className={styles.learningTask__contentContainer}>
                    {
                        currentStep !== -1 &&
                        <LearningHeader
                            type={tasks[currentStep].type}
                            name={"123"}
                            currentStep={currentStep}
                            stepCount={tasks.length}
                        />
                    }
                    <div className={styles.learningTask__taskContainer}>
                        {
                            currentStep === -1 &&
                            <StartLearning onStart={nextStep}/>
                        }
                        {/*{*/}
                        {/*    currentStep >= 0 && currentStep <= theoryCount - 1 &&*/}
                        {/*    (*/}
                        {/*        <div className={clsx(styles.learningTask__theory, styles.learningTask__startAnimation)}>*/}
                        {/*            <TheoryCard wordObject={tasks[currentStep].task?.wordObject}/>*/}
                        {/*        </div>*/}
                        {/*    )*/}
                        {/*}*/}
                        {
                            currentStep >= 0 && currentStep < theoryCount + practiceCount &&
                            (
                                <div className={clsx(styles.learningTask__theory, styles.learningTask__startAnimation)}>
                                    <LearningTaskBlock
                                        task={tasks[currentStep]}
                                        currentStep={currentStep}
                                        nextStep={nextStep}
                                        prevStep={prevStep}
                                    />
                                </div>
                            )
                        }
                    </div>

                </div>



                {/*{*/}
                {/*    currentStep !== -1 &&*/}
                {/*    <div className={styles.learningTask__progressBarContainer}>*/}
                {/*        <ProgressBar currentStep={currentStep - 1} stepCount={tasks.length}/>*/}
                {/*    </div>*/}
                {/*}*/}

                <div className={styles.learningTask__exitButtonContainer}>
                    <Button
                        variant="faded"
                        color="default"
                        onClick={openExitModal}
                    >
                        В главное меню
                    </Button>
                </div>

                {/*<div className={styles.learningTask__taskContainer}>*/}

                {/*    {*/}
                {/*        currentStep >= 0 && currentStep <= theoryCount - 1 &&*/}
                {/*        (*/}
                {/*            <div className={clsx(styles.learningTask__theory, styles.learningTask__startAnimation)}>*/}
                {/*                <LearningTaskBlock wordObject={tasks[currentStep].task?.wordObject}/>*/}
                {/*            </div>*/}
                {/*        )*/}
                {/*    }*/}
                {/*    {*/}
                {/*        currentStep !== -1 &&*/}
                {/*        currentStep >= theoryCount &&*/}
                {/*        currentStep <= theoryCount + practiceCount - 1 &&*/}
                {/*        <PracticeCards type={tasks[currentStep].task.type}*/}
                {/*                       task={tasks[currentStep].task}*/}
                {/*                       checked={taskChecked}*/}
                {/*                       setStatus={setCurrentStepStatus}*/}
                {/*                       setTaskCompleted={setTaskCompleted}*/}
                {/*        />*/}
                {/*    }*/}
                {/*    {*/}
                {/*        currentStep === theoryCount + practiceCount &&*/}
                {/*        <div className={styles.learningTask__result}>*/}
                {/*            <img src={ResultImage} rel="preload" className={styles.learningTask__resultImage}*/}
                {/*                 alt="Your result"/>*/}
                {/*            <Typography variant="h2" className={styles.learningTask__resultTitle}>*/}
                {/*                Конец обучения!*/}
                {/*            </Typography>*/}
                {/*            <Typography variant="p" className={styles.learningTask__resultDescription}>*/}
                {/*                Вы выучили несколько жестов.<br/>Теперь можете перейти к следующему этапу<br/>*/}
                {/*                и на практике попробовать эти жесты!*/}
                {/*            </Typography>*/}
                {/*        </div>*/}
                {/*    }*/}
                {/*</div>*/}

                {/*<div className={styles.learningTask__buttonsContainer}>*/}
                {/*    {*/}
                {/*        currentStep >= 0 && currentStep <= theoryCount - 2 &&*/}
                {/*        <Button*/}
                {/*            size="lg"*/}
                {/*            variant="faded"*/}
                {/*            color="primary"*/}
                {/*            onClick={nextStep}*/}
                {/*        >*/}
                {/*            Далее*/}
                {/*        </Button>*/}
                {/*    }*/}

                {/*    {*/}
                {/*        currentStep === theoryCount - 1 &&*/}
                {/*        <Button*/}
                {/*            size="lg"*/}
                {/*            color="primary"*/}
                {/*            onClick={nextStep}*/}
                {/*        >*/}
                {/*            Перейти к практике*/}
                {/*        </Button>*/}
                {/*    }*/}

                {/*    {*/}
                {/*        currentStepStatus.status === 'default' &&*/}
                {/*        currentStep >= theoryCount &&*/}
                {/*        currentStep <= (theoryCount + practiceCount - 1) &&*/}
                {/*        tasks[currentStep].task.type !== "MatchWordAndGIF" &&*/}
                {/*        <Button*/}
                {/*            disabled={!taskCompleted}*/}
                {/*            color={taskCompleted ? "primary" : "default"}*/}
                {/*            variant="faded"*/}
                {/*            size="lg"*/}
                {/*            onClick={() => {*/}
                {/*                setTaskChecked(true)*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            Проверить*/}
                {/*        </Button>*/}
                {/*    }*/}

                {/*</div>*/}

                {/*<div className={styles.learningTask__taskContinueContainer}>*/}
                {/*    {*/}
                {/*        currentStepStatus.status === 'success' &&*/}
                {/*        <TaskContinue*/}
                {/*            next={() => {*/}
                {/*                nextStep()*/}
                {/*                setCurrentStepStatus({status: "default"})*/}
                {/*                setTaskChecked(false)*/}
                {/*                setTaskCompleted(false)*/}
                {/*            }}*/}
                {/*            isRightAnswer={true}*/}
                {/*        />*/}
                {/*    }*/}

                {/*    {*/}
                {/*        currentStepStatus.status === 'error' &&*/}
                {/*        <TaskContinue*/}
                {/*            next={() => {*/}
                {/*                nextStep()*/}
                {/*                setCurrentStepStatus({status: "default"})*/}
                {/*                setTaskChecked(false)*/}
                {/*                setTaskCompleted(false)*/}
                {/*            }}*/}
                {/*            isRightAnswer={false}*/}
                {/*            rightAnswer={currentStepStatus.message}*/}
                {/*        />*/}
                {/*    }*/}

                {/*    {*/}
                {/*        currentStep === theoryCount + practiceCount &&*/}
                {/*        <div className={styles.learningTask__toPractice}>*/}
                {/*            <Button variant="faded" onClick={toMainPage}>*/}
                {/*                В главное меню*/}
                {/*            </Button>*/}
                {/*            <Button color="primary" onClick={toTrainingPage}>*/}
                {/*                Попробовать свои знания*/}
                {/*            </Button>*/}
                {/*        </div>*/}
                {/*    }*/}
                {/*</div>*/}
            </PageContent>
        </Page>
    )
})
