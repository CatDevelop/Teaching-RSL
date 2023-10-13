import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./LearningTaskPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/Logo.svg"
import {shuffleArray} from "../../../../core/utils/shuffleArray";
import {StartThemeTasks, StartThemeWords, taskType} from "../../../../core/data";
import {Button} from "../../../../components/Button";
import {TheoryCard} from "../../components/TheoryCard";
import {Card} from "../../../../components/Card";
import {Typography} from "../../../../components/Typography";
import {useNavigate} from "react-router-dom";
import {clsx} from "clsx";
import {Word} from "../../../../core/models/Word";
import {TaskContinue} from "../../../../components/TaskContinue";
import {StepStatus} from '../../../../core/models/StepStatus'
import {ProgressBar} from "../../../../components/ProgressBar";
import {PageContent} from "../../../../components/PageContent";
import ResultImage from "../../../../assets/images/ResultLearningImage.svg";
import {getFireworks} from "../../../../core/utils/explodeFireworks";
import {ExitConfirmation} from "../../../../components/ExitConfirmation";
import {PracticeCards} from "../../components/PracticeCards/PracticeCards";
import {TasksType} from "../../../../core/models/Tasks";

// TODO написать нормальные типы
type task = {
    id: number,
    task: any,
    type: string
}

type GeneratePracticesType = (words: Word[], tasks: taskType[]) => TasksType[]

export const LearningTaskPage: FC = typedMemo(function LearningTaskPage() {
    const navigate = useNavigate()
    const fireworks = getFireworks(3000)
    const theoryCount = 5;
    const practiceCount = 3;

    // -1 - стартовая плашка
    // 0-(theoryCount-1) - теория
    // (theoryCount)-(theoryCount+practiceCount-1) - практика
    const [currentStep, setCurrentStep] = useState(-1)
    const [currentStepStatus, setCurrentStepStatus] = useState<StepStatus>({status: "default"})

    const [taskCompleted, setTaskCompleted] = useState<boolean>(false)
    const [taskChecked, setTaskChecked] = useState<boolean>(false)
    const [exitModalIsOpen, setExitModalIsOpen] = useState(false)

    const generatePractices: GeneratePracticesType = useCallback((words, tasks) => {
        const getOtherWords = (words: Word[], currentWordIndex: number, count: number) => {
            let otherWords = [...words]
            otherWords.splice(currentWordIndex, 1)
            const shuffledOtherWords = shuffleArray(otherWords)
            return shuffledOtherWords.slice(0, count)
        }

        const shuffledWords = shuffleArray(words);
        const shuffledTasks = shuffleArray(tasks);
        let results: TasksType[] = [];
        let taskIndex = 0;
        for (let task of shuffledTasks) {
            if (task === "SelectWord" || task === "SelectGIFByWord") {
                results.push({
                    wordObject: shuffledWords[taskIndex],
                    otherVariants: getOtherWords(shuffledWords, taskIndex, 3),
                    type: task
                })
                taskIndex += 1;
            }

            if (task === "MatchWordAndGIF") {
                results.push({
                    variants: shuffledWords.slice(taskIndex, taskIndex + 3),
                    type: task
                })
                taskIndex += 3;
            }
        }
        return results
    }, [])

    const [tasks] = useState<task[]>([
        ...shuffleArray(StartThemeWords).map((wordObject, index) => ({
            id: index,
            task: {
                wordObject
            },
            type: "theory"
        })),
        ...shuffleArray(generatePractices(StartThemeWords, StartThemeTasks)).map((task, index) => ({
            id: index + 5,
            task,
            type: "practice"
        }))
    ])

    useEffect(() => {
        if (currentStep === theoryCount + practiceCount)
            fireworks()
    }, [currentStep, fireworks]);

    const nextStep = useCallback(() => {
        setCurrentStep(currentStep + 1)
    }, [currentStep, setCurrentStep])

    const toMainPage = useCallback(() => navigate("/"), [navigate])
    const toTrainingPage = useCallback(() => navigate("training"), [navigate])

    return (
        <Page>
            <ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen}/>
            <PageContent className={styles.learningTask}>
                <div className={styles.learningTask__logoContainer} onClick={() => navigate("/")}>
                    <img src={Logo} rel="preload" alt="Логотип" width={230}/>
                </div>

                {
                    currentStep !== -1 &&
                    <div className={styles.learningTask__progressBarContainer}>
                        <ProgressBar currentStep={currentStep - 1} stepCount={tasks.length}/>
                    </div>
                }

                <div className={styles.learningTask__exitButtonContainer}>
                    <Button
                        variant="faded"
                        color="default"
                        onClick={() => setExitModalIsOpen(true)}
                    >
                        В главное меню
                    </Button>
                </div>


                <div className={styles.learningTask__taskContainer}>
                    {
                        currentStep === -1 &&
                        (
                            <Card className={clsx(styles.learningTask__startCard, styles.learningTask__startAnimation)}>
                                <Typography variant="h2">Начало обучения</Typography>
                                <Typography
                                    variant="p"
                                    className={styles.learningTask__startCardDescription}
                                >
                                    Сначала вы ознакомитесь с теорией, затем пройдёте 3 интерактивных задания,
                                    чтобы закрепить материал.<br/>
                                    Постарайтесь запомнить все жесты, чтобы успешно пройти практику.
                                </Typography>

                                <Button
                                    variant="solid"
                                    color="primary"
                                    onClick={() => setCurrentStep(0)}
                                >
                                    Начать прохождение
                                </Button>
                            </Card>
                        )
                    }

                    {
                        currentStep >= 0 && currentStep <= theoryCount - 1 &&
                        (
                            <div className={clsx(styles.learningTask__theory, styles.learningTask__startAnimation)}>
                                <TheoryCard wordObject={tasks[currentStep].task?.wordObject}/>
                            </div>
                        )
                    }

                    {
                        currentStep !== -1 &&
                        currentStep >= theoryCount &&
                        currentStep <= theoryCount + practiceCount - 1 &&
                        <PracticeCards type={tasks[currentStep].task.type}
                                       task={tasks[currentStep].task}
                                       checked={taskChecked}
                                       setStatus={setCurrentStepStatus}
                                       setTaskCompleted={setTaskCompleted}
                        />
                    }


                    {
                        currentStep === theoryCount + practiceCount &&
                        <div className={styles.learningTask__result}>
                            <img src={ResultImage} rel="preload" className={styles.learningTask__resultImage} alt="Your result"/>
                            <Typography variant="h2" className={styles.learningTask__resultTitle}>
                                Конец обучения!
                            </Typography>
                            <Typography variant="p" className={styles.learningTask__resultDescription}>
                                Вы выучили несколько жестов.<br/>Теперь можете перейти к следующему этапу<br/>
                                и на практике попробовать эти жесты!
                            </Typography>
                        </div>
                    }
                </div>

                <div className={styles.learningTask__buttonsContainer}>
                    {
                        currentStep >= 0 && currentStep <= theoryCount - 2 &&
                        <Button
                            size="lg"
                            variant="faded"
                            color="primary"
                            onClick={nextStep}
                        >
                            Далее
                        </Button>
                    }

                    {
                        currentStep === theoryCount - 1 &&
                        <Button
                            size="lg"
                            color="primary"
                            onClick={nextStep}
                        >
                            Перейти к практике
                        </Button>
                    }

                    {
                        currentStepStatus.status === 'default' &&
                        currentStep >= theoryCount &&
                        currentStep <= (theoryCount + practiceCount - 1) &&
                        tasks[currentStep].task.type !== "MatchWordAndGIF" &&
                        <Button
                            disabled={!taskCompleted}
                            color={taskCompleted ? "primary" : "default"}
                            variant="faded"
                            size="lg"
                            onClick={() => {
                                setTaskChecked(true)
                            }}
                        >
                            Проверить
                        </Button>
                    }

                </div>

                <div className={styles.learningTask__taskContinueContainer}>
                    {
                        currentStepStatus.status === 'success' &&
                        <TaskContinue
                            next={() => {
                                nextStep()
                                setCurrentStepStatus({status: "default"})
                                setTaskChecked(false)
                                setTaskCompleted(false)
                            }}
                            isRightAnswer={true}
                        />
                    }

                    {
                        currentStepStatus.status === 'error' &&
                        <TaskContinue
                            next={() => {
                                nextStep()
                                setCurrentStepStatus({status: "default"})
                                setTaskChecked(false)
                                setTaskCompleted(false)
                            }}
                            isRightAnswer={false}
                            rightAnswer={currentStepStatus.message}
                        />
                    }

                    {
                        currentStep === theoryCount + practiceCount &&
                        <div className={styles.learningTask__toPractice}>
                            <Button variant="faded" onClick={toMainPage}>
                                В главное меню
                            </Button>
                            <Button color="primary" onClick={toTrainingPage}>
                                Попробовать свои знания
                            </Button>
                        </div>
                    }
                </div>
            </PageContent>
        </Page>
    )
})
