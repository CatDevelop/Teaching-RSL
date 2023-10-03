import {Word} from "../../core/models/Word";

export type taskType = "SelectWord" | "SelectGIFByWord" | "MatchWordAndGIF"
export const StartThemeWords: Word[] = [
    {
        id: 0,
        text: "Привет",
        gifSource: "https://media.spreadthesign.com/video/mp4/12/17658.mp4",
        imageSource: "https://media.spreadthesign.com/image/200/585.jpg",
    },
    {
        id: 1,
        text: "Друг",
        gifSource: "https://media.spreadthesign.com/video/mp4/12/351476.mp4",
        imageSource: "https://media.spreadthesign.com/image/200/585.jpg",
    },
    {
        id: 2,
        text: "Я",
        gifSource: "https://media.spreadthesign.com/video/mp4/12/12788.mp4",
        imageSource: "https://media.spreadthesign.com/image/200/585.jpg",
    },
    {
        id: 3,
        text: "Любовь",
        gifSource: "https://media.spreadthesign.com/video/mp4/12/5776.mp4",
        imageSource: "https://media.spreadthesign.com/image/200/585.jpg",
    },
    {
        id: 4,
        text: "Тебя",
        gifSource: "https://media.spreadthesign.com/video/mp4/12/5776.mp4",
        imageSource: "https://media.spreadthesign.com/image/200/585.jpg",
    },
]

export const StartThemeTasks: taskType[] = [
    "SelectWord",
    "SelectGIFByWord",
    "MatchWordAndGIF"
]
