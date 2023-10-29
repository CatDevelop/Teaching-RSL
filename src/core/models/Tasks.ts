import {Word} from "./Word";

type TaskType<T> = {
    type: T,
    wordObject: Word,
    otherVariants: Word[],
}

export type SelectWordTaskType = TaskType<"SelectWord">;
export type SelectImageTaskType = TaskType<"SelectImage">;
export type SelectGIFByWordTaskType = TaskType<"SelectGIFByWord">;
export type MatchWordAndGIFTaskType = Pick<TaskType<"MatchWordAndGIF">, "type" | "otherVariants">
export type TheoryTaskType = Pick<TaskType<"theory">, "type" | "wordObject">

export type TasksType = (
    SelectWordTaskType |
    SelectImageTaskType |
    SelectGIFByWordTaskType |
    MatchWordAndGIFTaskType |
    TheoryTaskType
)

