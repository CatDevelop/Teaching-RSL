import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {Dispatch, FC, SetStateAction} from "react";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import {taskType} from "../../../../core/data";
import {PracticeSelectWordByGIF} from "./PracticeSelectWord2";
import {PracticeSelectGIFByWord} from "./PracticeSelectGIFByWord";
import {PracticeMatchWordAndGIF} from "./PracticeMatchWordAndGIF2";
import {StepStatus} from "../../../../core/models/StepStatus";

type Props = ComponentProps & Readonly<{
    task: any, // TODO дописать тип
    checked?: boolean,
    setStatus: Dispatch<SetStateAction<StepStatus>>,
    setTaskCompleted: Dispatch<SetStateAction<boolean>>
    setTaskChecked: React.Dispatch<React.SetStateAction<boolean>>;
}>

/**
 * Карточки практик для обучения
 */
export const PracticeCards: FC<Props> = typedMemo(function PracticeCards(props) {
    if (props.task.type === "SelectWordByGif")
        return <PracticeSelectWordByGIF
            rightSelect={props.task.rightSelect}
            otherSelects={props.task.otherSelects}
            checked={props.checked || false}
            setStatus={props.setStatus}
            setIsTaskReadyToCheck={props.setTaskCompleted}
        />

    if (props.task.type === "SelectGifByWord")
        return <PracticeSelectGIFByWord
            wordObject={props.task.rightSelect}
            otherVariants={props.task.otherSelects}
            checked={props.checked || false}
            setStatus={props.setStatus}
            setIsTaskReadyToCheck={props.setTaskCompleted}
        />

    if (props.task.type === "MatchWordAndGif")
        return <PracticeMatchWordAndGIF
            variants={props.task.conditions}
            setStatus={props.setStatus}
            setIsTaskReadyToCheck={props.setTaskCompleted}
            setTaskChecked={props.setTaskChecked}
        />
});
