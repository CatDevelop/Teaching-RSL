import {Word} from "../../core/models/Word";
import Hello from "../../assets/images/Words/Привет.svg"
export type taskType = "SelectWord" | "SelectGIFByWord" | "MatchWordAndGIF"
export const StartThemeWords: Word[] = [
    {
        id: 0,
        text: "Привет",
        gifSource: "https://media.spreadthesign.com/video/mp4/12/17658.mp4",
        imageSource: Hello,
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
        imageSource: "https://img.freepik.com/free-vector/in-love-illustration-concept_114360-867.jpg?w=740&t=st=1696343075~exp=1696343675~hmac=b2f71632908f384437f68a1838ab5d32feb410145a728f1ac20332feb27bcc6d",
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
