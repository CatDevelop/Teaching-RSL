import { FC, useCallback, useMemo } from "react";
import { Progress } from "@nextui-org/react";
import { typedMemo } from "../../core/utils/typedMemo";
import { ComponentProps } from "../../core/models/ComponentProps";

type Props = ComponentProps & Readonly<{
    currentTaskId: number;

    // TODO: заменить нормальным типом
    tasks: {id: number}[];
}>;

/** Task progress. */
export const TaskProgress: FC<Props> = typedMemo(function TaskProgress(props){

    const getProgress = useCallback(() => {
        const currentTaskIndex = props.tasks.findIndex(task => task.id === props.currentTaskId);

        if(currentTaskIndex === -1) return 0;
        return Math.round((currentTaskIndex + 1) / props.tasks.length * 100) ;
    },[props.tasks, props.currentTaskId]);

    const progress = useMemo(getProgress, [props.tasks, props.currentTaskId, getProgress]);

    return <Progress aria-label="Task progress" value={progress} className={props.className}/>
});
