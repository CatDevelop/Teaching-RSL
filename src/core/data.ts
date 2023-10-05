import {Word} from "./models/Word";
import Hello from "../assets/images/Words/Привет.svg"
import HelloSignVideo from "../assets/video/ExhibitionStand/Привет.mp4"
import FriendSignVideo from "../assets/video/ExhibitionStand/Друг.mp4"
import ISignVideo from "../assets/video/ExhibitionStand/Я.mp4"
import LoveSignVideo from "../assets/video/ExhibitionStand/Люблю.mp4"
import YouSignVideo from "../assets/video/ExhibitionStand/Тебя.mp4"
export type taskType = "SelectWord" | "SelectGIFByWord" | "MatchWordAndGIF"
export const StartThemeWords: Word[] = [
    {
        id: 0,
        text: "Привет",
        gifSource: HelloSignVideo,
        // gifSource: "https://media.spreadthesign.com/video/mp4/12/17658.mp4",
        imageSource: Hello,
    },
    {
        id: 1,
        text: "Друг",
        gifSource: FriendSignVideo,
        // gifSource: "https://media.spreadthesign.com/video/mp4/12/351476.mp4",
        imageSource: "https://media.spreadthesign.com/image/200/585.jpg",
    },
    {
        id: 2,
        text: "Я",
        gifSource: ISignVideo,
        // gifSource: "https://media.spreadthesign.com/video/mp4/12/12788.mp4",
        imageSource: "https://media.spreadthesign.com/image/200/585.jpg",
    },
    {
        id: 3,
        text: "Любовь",
        gifSource: LoveSignVideo,
        // gifSource: "https://media.spreadthesign.com/video/mp4/12/43672.mp4",
        imageSource: "https://img.freepik.com/free-vector/in-love-illustration-concept_114360-867.jpg?w=740&t=st=1696343075~exp=1696343675~hmac=b2f71632908f384437f68a1838ab5d32feb410145a728f1ac20332feb27bcc6d",
    },
    {
        id: 4,
        text: "Тебя",
        gifSource: YouSignVideo,
        // gifSource: "https://media.spreadthesign.com/video/mp4/12/12804.mp4",
        imageSource: "https://media.spreadthesign.com/image/200/585.jpg",
    },
]

export const StartThemeTasks: taskType[] = [
    "SelectWord",
    "SelectGIFByWord",
    "MatchWordAndGIF"
]
