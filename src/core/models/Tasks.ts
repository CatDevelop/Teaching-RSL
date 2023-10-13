import {Word} from "./Word";

export type SelectWordTaskType = {
    wordObject: Word,
    otherVariants: Word[],
    type: "SelectWord"
}

export type SelectImageTaskType = {
    wordObject: Word,
    otherVariants: Word[],
    type: "SelectImage"
}

export type SelectGIFByWordTaskType = {
    wordObject: Word,
    otherVariants: Word[],
    type: "SelectGIFByWord"
}

export type MatchWordAndGIFTaskType = {
    variants: Word[],
    type: "MatchWordAndGIF"
}

export type TheoryTaskType = {
    wordObject: Word,
    type: "theory"
}

export type TasksType = SelectWordTaskType | SelectImageTaskType | SelectGIFByWordTaskType | MatchWordAndGIFTaskType | TheoryTaskType
