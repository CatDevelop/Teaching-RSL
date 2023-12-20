import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./LearningTaskBlock.module.css";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import {Card} from "../../../../components/Card";
import {TheoryCard} from "../TheoryCard";
import {Button} from "../../../../components/Button";
import {PracticeCards} from "../PracticeCards";
import {StepStatus} from "../../../../core/models/StepStatus";
import {TaskFeedback} from "../../../../components/TaskFeedback";
import {toast} from "react-toastify";

type Props = ComponentProps & Readonly<{
    task: any;
    currentStep: number;
    nextStep: () => void;
    prevStep: () => void;
}>

/*
    Общий контейнер для заданий в обучении: теория + практика + управляющие кнопки
*/
export const LearningTaskBlock: FC<Props> = typedMemo(function LearningTaskBlock(props) {
    const [taskCompleted, setTaskCompleted] = useState<boolean>(false)
    const [taskChecked, setTaskChecked] = useState<boolean>(false)
    const [currentStepStatus, setCurrentStepStatus] = useState<StepStatus>({status: "default"})

    const resetBlock = useCallback(() => {
        setTaskCompleted(false)
        setTaskChecked(false)
        setCurrentStepStatus({status: "default"})
    }, [])

    useEffect(() => {
        console.log(taskCompleted, taskChecked, currentStepStatus)
        if(taskCompleted && taskChecked) {
            if(currentStepStatus.status === "success")
                toast.success("Вы отлично справились!")
            if(currentStepStatus.status === "error")
                toast.error("Неверный ответ\nПравильный ответ:\n"+currentStepStatus.message)
        }
    }, [taskChecked, taskCompleted, currentStepStatus]);

    return (
        <Card className={styles.learningTaskBlock}>
            {
                props.task.type === "theory" &&
                <TheoryCard wordObject={props.task.task}/>
            }
            {
                props.task.type !== "theory" &&
                <PracticeCards
                    task={props.task.task}
                    checked={taskChecked}
                    setStatus={setCurrentStepStatus}
                    setTaskCompleted={setTaskCompleted}
                    setTaskChecked={setTaskChecked}
                />
            }
            <div className={styles.learningTaskBlock__buttonContainer}>
                {
                    props.task.type === "theory" && props.currentStep > 0 &&
                    <Button
                        onClick={props.prevStep}
                        size="lg"
                        variant="faded"
                        color="primary"
                    >
                        Назад
                    </Button>
                }
                {
                    (
                        props.task.type === "theory" ||
                        (props.task.type !== "theory" && taskChecked) ||
                        (props.task.task.type === "MatchWordAndGif")
                    ) &&
                    <Button
                        onClick={() => {
                            props.nextStep()
                            resetBlock()
                        }}
                        size="lg"
                        variant="solid"
                        color="primary"
                        disabled={!taskChecked && props.task.type !== "theory"}
                    >
                        Далее
                    </Button>
                }
                {
                    props.task.type !== "theory" && props.task.task.type !== "MatchWordAndGif" && !taskChecked &&
                    <Button
                        onClick={() => setTaskChecked(true)}
                        size="lg"
                        variant="solid"
                        color="primary"
                        disabled={!taskCompleted}
                    >
                        Проверить
                    </Button>
                }
            </div>
        </Card>
    );
});
