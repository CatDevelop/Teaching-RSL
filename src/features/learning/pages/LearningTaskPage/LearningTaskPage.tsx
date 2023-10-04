import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useMemo, useState} from "react";
import styles from "./LearningTaskPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/Logo.svg"
import {TaskProgress} from "../../../../components/TaskProgress";
import {shuffleArray} from "../../../../core/utils/shuffleArray";
import {StartThemeTasks, StartThemeWords, taskType} from "../../data";
import {Button} from "../../../../components/Button";
import {TheoryCard} from "../../components/TheoryCard";
import {Card} from "../../../../components/Card";
import {Typography} from "../../../../components/Typography";
import {useNavigate} from "react-router-dom";
import {clsx} from "clsx";
import {Word} from "../../../../core/models/Word";
import {TaskContinue} from "../../../../components/TaskContinue";
import {StepStatus} from '../../../../core/models/StepStatus'
import {PracticeSelectWord} from "../../components/PracticeCards/PracticeSelectWord";
import {PracticeSelectGIFByWord} from "../../components/PracticeCards/PracticeSelectGIFByWord";
import {PracticeMatchWordAndGIF} from "../../components/PracticeCards/PracticeMatchWordAndGIF";

export const LearningTaskPage: FC = typedMemo(function LearningTaskPage() {
    const navigate = useNavigate()
    const theoryCount = 5;
    const practiceCount = 3;

    // -1 - стартовая плашка
    // 0-(theoryCount-1) - теория
    // (theoryCount)-(theoryCount+practiceCount-1) - практика
    const [currentStep, setCurrentStep] = useState(-1)
    const [currentStepStatus, setCurrentStepStatus] = useState<StepStatus>({status: "default"})

    const [taskCompleted, setTaskCompleted] = useState<boolean>(false)
    const [taskChecked, setTaskChecked] = useState<boolean>(false)


    const generatePractices = (words: Word[], tasks: taskType[]) => {
        const getOtherWords = (words: Word[], currentWordIndex: number, count: number) => {
            let otherWords = [...words]
            otherWords.splice(currentWordIndex, 1)
            const shuffledOtherWords = shuffleArray(otherWords)
            return shuffledOtherWords.slice(0, count)
        }
        const shuffledWords = shuffleArray(words);
        const shuffledTasks = shuffleArray(tasks);
        let results = [];
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
    }

    const [tasks] = useState(() => [
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
    console.log(tasks, currentStep)

    return (
        <Page className={styles.learningTask}>
            <div className={styles.learningTask__logoContainer} onClick={() => navigate("/")}>
                <img src={Logo} alt={"Логотип"} width={230}/>
            </div>
            {
                currentStep !== -1 &&
                <div className={styles.learningTask__progressBarContainer}>
                    <TaskProgress currentTaskId={currentStep - 1} tasks={tasks}/>
                </div>
            }
            <div className={styles.learningTask__exitButtonContainer}>
                <Button variant={"faded"} color={"default"} onClick={() => navigate("/")}>В главное меню</Button>
            </div>


            <div className={styles.learningTask__taskContainer}>
                {
                    currentStep === -1 &&
                    (
                        <div>
                            <Card className={clsx(styles.learningTask__startCard, styles.learningTask__startAnimation)}>
                                <Typography variant={"h2"}>
                                    Начало обучения
                                </Typography>

                                Утром - теорию проходит, потом - практикуешься, наши задачки выполняешь. <br/> Вечерком
                                попрактикуйся и вообще красавчик будешь!

                                <Button variant={"solid"} color={"primary"}
                                        onClick={() => setCurrentStep(0)}
                                >
                                    Начать прохождение
                                </Button>
                            </Card>
                        </div>
                    )
                }
                {
                    currentStep >= 0 && currentStep <= theoryCount - 1 &&
                    (
                        <div className={clsx(styles.learningTask__theory, styles.learningTask__startAnimation)}>
                            <TheoryCard wordObject={tasks[currentStep].task.wordObject}/>
                        </div>
                    )
                }
                {
                    currentStep !== -1 && currentStep >= theoryCount && currentStep <= theoryCount + practiceCount - 1 &&
                    // currentStep >=theoryCount && theoryCount+practiceCount-1 <= currentStep &&
                    (tasks[currentStep].task.type === "SelectWord"
                        ? <PracticeSelectWord wordObject={tasks[currentStep].task.wordObject}
                                              otherVariants={tasks[currentStep].task.otherVariants}
                                              checked={taskChecked}
                                              setStatus={setCurrentStepStatus}
                                              setIsTaskReadyToCheck={setTaskCompleted}
                        />
                        : tasks[currentStep].task.type === "SelectGIFByWord" ?
                            <PracticeSelectGIFByWord wordObject={tasks[currentStep].task.wordObject}
                                                     otherVariants={tasks[currentStep].task.otherVariants}
                                                     checked={taskChecked}
                                                     setStatus={setCurrentStepStatus}
                                                     setIsTaskReadyToCheck={setTaskCompleted}
                            />
                            : tasks[currentStep].task.type === "MatchWordAndGIF"
                                ?
                                <PracticeMatchWordAndGIF variants={tasks[currentStep].task.variants}
                                                         setStatus={setCurrentStepStatus}
                                                         setIsTaskReadyToCheck={setTaskCompleted}
                                /> : <></>)
                }
                {
                    currentStep === theoryCount + practiceCount && <div>Конец
                    </div>
                }
            </div>

            <div className={styles.learningTask__buttonsContainer}>
                {
                    currentStep >= 0 && currentStep <= theoryCount - 2 &&
                    <Button size={"lg"} variant={"faded"} color={"primary"}
                            onClick={() => setCurrentStep(currentStep + 1)}>Далее</Button>
                }

                {
                    currentStep === theoryCount - 1 &&
                    <Button size={"lg"} color={"primary"} onClick={() => setCurrentStep(currentStep + 1)}>Перейти к
                        практике</Button>
                }

                {
                    currentStepStatus.status === 'default' && currentStep >= theoryCount && currentStep <= (theoryCount + practiceCount - 1) &&
                    tasks[currentStep].task.type !== "MatchWordAndGIF" &&
                    <Button disabled={!taskCompleted}
                            color={taskCompleted ? "primary" : "default"}
                            variant={"faded"}
                            size={"lg"}
                            onClick={() => {
                                setTaskChecked(true)
                            }}>Проверить</Button>
                }

            </div>

            <div className={styles.learningTask__taskContinueContainer}>
                {
                    currentStepStatus.status === 'success' &&
                    <TaskContinue continue={() => {
                        setCurrentStep(currentStep + 1)
                        setCurrentStepStatus({status: "default"})
                        setTaskChecked(false)
                        setTaskCompleted(false)
                    }} isRightAnswer={true}/>
                }
                {
                    currentStepStatus.status === 'error' &&
                    <TaskContinue continue={() => {
                        setCurrentStep(currentStep + 1)
                        setCurrentStepStatus({status: "default"})
                        setTaskChecked(false)
                        setTaskCompleted(false)
                    }} isRightAnswer={false} rightAnswer={currentStepStatus.message}/>
                }
            </div>
            {/*<Typography*/}
            {/*    variant="h1"*/}
            {/*    className={styles.learningCatalog__title}>*/}
            {/*    Обучение*/}
            {/*</Typography>*/}
        </Page>
    )
})
