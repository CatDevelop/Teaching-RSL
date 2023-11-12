import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useState} from "react";
import styles from "./LearningTaskBlock.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import TheoryIconSVG from "../../../../assets/images/TheoryIcon.svg"
import {Typography} from "../../../../components/Typography";
import {SignVideo} from "../../../../components/SignVideo";
import {LearningBlock} from "../LearningBlock";
import {Word} from "../../../../core/models/Word";
import {Card} from "../../../../components/Card";
import {TheoryCard} from "../TheoryCard";
import {Button} from "../../../../components/Button";
import {PracticeCards} from "../PracticeCards";
import {StepStatus} from "../../../../core/models/StepStatus";

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
    console.log(props.task)
    const [taskCompleted, setTaskCompleted] = useState<boolean>(false)
    const [taskChecked, setTaskChecked] = useState<boolean>(false)
    const [currentStepStatus, setCurrentStepStatus] = useState<StepStatus>({status: "default"})


    return (
        <Card className={styles.learningTaskBlock}>
            {
                props.task.type === "theory" &&
                <TheoryCard wordObject={props.task.task?.wordObject}/>
            }
            {
                props.task.type === "practice" &&
                <PracticeCards type={props.task.task.type}
                               task={props.task.task}
                               checked={taskChecked}
                               setStatus={setCurrentStepStatus}
                               setTaskCompleted={setTaskCompleted}
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
                    (props.task.type === "theory" || (props.task.type === "practice" && taskChecked))  &&
                    <Button
                        onClick={props.nextStep}
                        size="lg"
                        variant="solid"
                        color="primary"
                    >
                        Далее
                    </Button>
                }
                {
                    props.task.type === "practice" && taskChecked &&
                    <Button
                        onClick={props.nextStep}
                        size="lg"
                        variant="faded"
                        color="primary"
                    >
                        Сообщить об ошибке
                    </Button>
                }
                {
                    props.task.type === "practice" && !taskChecked &&
                    <Button
                        onClick={props.nextStep}
                        size="lg"
                        variant="solid"
                        color="primary"
                    >
                        Проверить
                    </Button>
                }
            </div>
        </Card>
        // <div className={clsx(styles.theoryCard)}>
        //     <LearningBlock iconUrl={TheoryIconSVG} title={"Теория"}>
        //         <div className={styles.theoryCard__contentContainer}>
        //             <div className={styles.theoryCard__images}>
        //                 <SignVideo
        //                     src={props.wordObject.gifSource}
        //                     className={styles.theoryCard__gif}
        //                 />
        //
        //                 {
        //                     props.wordObject.imageSource &&
        //                     <img
        //                         rel="preload"
        //                         src={props.wordObject.imageSource}
        //                         alt={"Изображение для жеста"}
        //                         className={styles.theoryCard__image}
        //                     />
        //                 }
        //             </div>
        //
        //             <Typography variant="h1" className={styles.theoryCard__word}>
        //                 {props.wordObject.text}
        //             </Typography>
        //         </div>
        //     </LearningBlock>
        // </div>
    );
});
