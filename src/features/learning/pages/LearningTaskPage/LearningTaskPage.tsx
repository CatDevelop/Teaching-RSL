import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, Suspense, useCallback, useEffect, useState} from "react";
import styles from "./LearningTaskPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/Logo.svg"
import {shuffleArray} from "../../../../core/utils/shuffleArray";
import {StartThemeTasks, StartThemeWords} from "../../../../core/data";
import {Button} from "../../../../components/Button";
import {useNavigate, useParams} from "react-router-dom";
import {clsx} from "clsx";
import {PageContent} from "../../../../components/PageContent";
import {getFireworks} from "../../../../core/utils/explodeFireworks";
import {ExitConfirmation} from "../../../../components/ExitConfirmation";
import {StartLearning} from "../../components/StartLearning";
import {generateTasks} from "../../../../core/utils/generateTasks";
import {TasksType} from "../../../../core/models/Tasks";
import {Word} from "../../../../core/models/Word";
import {LearningHeader} from "../../components/LearningHeader";
import {LearningTaskBlock} from "../../components/LearningTaskBlock";
import {useQuery} from "react-query";
import {LearningService} from "../../../../api/services/learning";
import {Spinner} from "@nextui-org/react";
import useLearningLevel from "../../../../core/hooks/use-learning-level";

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
    const {id} = useParams<{
        id: string
    }>();
    const navigate = useNavigate()
    const fireworks = getFireworks(3000)

    // const levelController = useLearningLevel(id || '')


    const levelController = {
        isLoading: false,
        level: {
            practiceCount: 4,
            tasks: [
                {
                    id: 0,
                    type: "theory",
                    task: {
                        wordId: "c220eaaf-b029-4f11-9cd8-d3ffc62e2ee9",
                        firstRepresentation: "Красный",
                        secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/4495.mp4"
                    }
                },
                {
                    id: 1,
                    type: "theory",
                    task: {
                        wordId: "9f1cbb39-60b2-4bae-bfa7-4c31b29b95cf",
                        firstRepresentation: "Оранжевый",
                        secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/349233.mp4"
                    }
                },
                {
                    id: 2,
                    type: "theory",
                    task: {
                        wordId: "d5bfca14-9367-414c-98b6-d7751c9739b4",
                        firstRepresentation: "Коричневый",
                        secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/7655.mp4"
                    }
                },
                {
                    id: 3,
                    type: "theory",
                    task: {
                        wordId: "fbcae8dd-9c1c-42f2-a6e5-f5007047b17e",
                        firstRepresentation: "Фиолетовый",
                        secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/14691.mp4"
                    }
                },
                {
                    id: 4,
                    type: "theory",
                    task: {
                        wordId: "62f341ec-e4a3-4500-adb9-f9a52ce81a21",
                        firstRepresentation: "Зелёный",
                        secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/5717.mp4"
                    }
                },
                {
                    id: 5,
                    type: "practice",
                    task: {
                        type: "SelectWordByGif",
                        rightSelect: {
                            wordId: "c220eaaf-b029-4f11-9cd8-d3ffc62e2ee9",
                            firstRepresentation: "Красный",
                            secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/4495.mp4"
                        },
                        otherSelects: [
                            "Фиолетовый",
                            "Зелёный",
                            "Оранжевый"
                        ]
                    }
                },
                {
                    id: 6,
                    type: "practice",
                    task: {
                        type: "MatchWordAndGif",
                        conditions: [
                            {
                                firstRepresentation: "Фиолетовый",
                                secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/14691.mp4",
                                wordId: "fbcae8dd-9c1c-42f2-a6e5-f5007047b17e"
                            },
                            {
                                firstRepresentation: "Красный",
                                secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/4495.mp4",
                                wordId: "c220eaaf-b029-4f11-9cd8-d3ffc62e2ee9"
                            },
                            {
                                firstRepresentation: "Оранжевый",
                                secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/349233.mp4",
                                wordId: "9f1cbb39-60b2-4bae-bfa7-4c31b29b95cf"
                            },
                            {
                                firstRepresentation: "Коричневый",
                                secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/7655.mp4",
                                wordId: "d5bfca14-9367-414c-98b6-d7751c9739b4",
                            },
                        ]
                    }
                },
                {
                    id: 7,
                    type: "practice",
                    task: {
                        type: "MatchWordAndGif",
                        conditions: [
                            {
                                firstRepresentation: "Коричневый",
                                secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/7655.mp4",
                                wordId: "d5bfca14-9367-414c-98b6-d7751c9739b4"
                            },
                            {
                                wordId: "fbcae8dd-9c1c-42f2-a6e5-f5007047b17e",
                                firstRepresentation: "Фиолетовый",
                                secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/14691.mp4",
                            },
                            {
                                wordId: "9f1cbb39-60b2-4bae-bfa7-4c31b29b95cf",
                                firstRepresentation: "Оранжевый",
                                secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/349233.mp4",
                            },
                            {
                                wordId: "62f341ec-e4a3-4500-adb9-f9a52ce81a21",
                                firstRepresentation: "Зелёный",
                                secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/5717.mp4",
                            },
                        ]
                    }
                },
                {
                    id: 8,
                    type: "practice",
                    task: {
                        type: "SelectGifByWord",
                        rightSelect: {
                            wordId: "fbcae8dd-9c1c-42f2-a6e5-f5007047b17e",
                            firstRepresentation: "Фиолетовый",
                            secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/14691.mp4"
                        },
                        otherSelects: [
                            "https://media.spreadthesign.com/video/mp4/12/349233.mp4",
                            "https://media.spreadthesign.com/video/mp4/12/5717.mp4",
                            "https://media.spreadthesign.com/video/mp4/12/7655.mp4"
                        ]
                    }
                },
            ],
            theoryCount: 5
        }
    }
    const [currentStep, setCurrentStep] = useState(-1)
    const [exitModalIsOpen, setExitModalIsOpen] = useState(false)

    const tasks = levelController.level.tasks
    const theoryCount = levelController.level.theoryCount;
    const practiceCount = levelController.level.practiceCount;

    useEffect(() => {
        if (currentStep === theoryCount + practiceCount)
            fireworks()
    }, [currentStep]);

    const nextStep = useCallback(() => {
        setCurrentStep(currentStep + 1)
    }, [currentStep, setCurrentStep])

    const prevStep = useCallback(() => {
        setCurrentStep(currentStep - 1)
    }, [currentStep, setCurrentStep])

    const openExitModal = useCallback(() => setExitModalIsOpen(true), [setExitModalIsOpen])
    const toMainPage = useCallback(() => navigate("/"), [navigate])
    const toTrainingPage = useCallback(() => navigate("/training"), [navigate])

    console.log(currentStep, theoryCount, practiceCount)
    if (levelController.isLoading)
        return <Spinner/>

    return (
        <Page>
            <Suspense fallback={<Spinner/>}>
                <ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen}/>
                <PageContent className={styles.learningTask}>

                    <div className={styles.learningTask__logoContainer} onClick={openExitModal}>
                        <img src={Logo} rel="preload" alt="Логотип" width={218}/>
                    </div>

                    <div className={styles.learningTask__contentContainer}>
                        {
                            currentStep !== -1 && currentStep < theoryCount + practiceCount &&
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
                                    <div
                                        className={clsx(styles.learningTask__theory, styles.learningTask__startAnimation)}>
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
            </Suspense>
        </Page>
    )
})
