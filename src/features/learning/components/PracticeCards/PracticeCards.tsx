import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {Dispatch, FC, SetStateAction} from "react";
import styles from "./TheoryCard.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import TheoryIconSVG from "../../../../assets/images/TheoryIcon.svg"
import {Typography} from "../../../../components/Typography";
import {SignVideo} from "../../../../components/SignVideo";
import {LearningBlock} from "../LearningBlock";
import {Word} from "../../../../core/models/Word";
import {taskType} from "../../../../core/data";
import {PracticeSelectWord} from "./PracticeSelectWord";
import {PracticeSelectGIFByWord} from "./PracticeSelectGIFByWord";
import {PracticeMatchWordAndGIF} from "./PracticeMatchWordAndGIF";
import {StepStatus} from "../../../../core/models/StepStatus";

type Props = ComponentProps & Readonly<{
    type: taskType,
    task: any, // TODO дописать тип
    checked?: boolean,
    setStatus: Dispatch<SetStateAction<StepStatus>>,
    setTaskCompleted: Dispatch<SetStateAction<boolean>>
}>

/** Карточки практик для обучения. */
export const PracticeCards: FC<Props> = typedMemo(function PracticeCards(props) {
    if (props.type === "SelectWord")
        return <PracticeSelectWord
            wordObject={props.task.wordObject}
            otherVariants={props.task.otherVariants}
            checked={props.checked || false}
            setStatus={props.setStatus}
            setIsTaskReadyToCheck={props.setTaskCompleted}
        />
    if (props.type === "SelectGIFByWord")
        return <PracticeSelectGIFByWord
            wordObject={props.task.wordObject}
            otherVariants={props.task.otherVariants}
            checked={props.checked || false}
            setStatus={props.setStatus}
            setIsTaskReadyToCheck={props.setTaskCompleted}
        />
    if (props.type === "MatchWordAndGIF")
        return <PracticeMatchWordAndGIF
            variants={props.task.variants}
            setStatus={props.setStatus}
            setIsTaskReadyToCheck={props.setTaskCompleted}
        />
});
