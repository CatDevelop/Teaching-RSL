import {Word} from "./models/Word";
import Hello from "../assets/images/ExhibitionStand/Привет.svg"
import I from "../assets/images/ExhibitionStand/Я.svg"
import You from "../assets/images/ExhibitionStand/Ты.png"
import Friend from "../assets/images/ExhibitionStand/Друг.svg"

export type taskType = "SelectWord" | "SelectGIFByWord" | "MatchWordAndGIF"
export const StartThemeWords: Word[] = [
    {
        id: 0,
        text: "Привет",
        recognitionText: 'привет',
        // gifSource: HelloSignVideo,
        gifSource: "https://media.spreadthesign.com/video/mp4/12/17658.mp4",
        imageSource: Hello,
    },
    {
        id: 1,
        text: "Друг",
        recognitionText: 'друг',
        // gifSource: FriendSignVideo,
        gifSource: "https://media.spreadthesign.com/video/mp4/12/351476.mp4",
        imageSource: Friend,
    },
    {
        id: 2,
        text: "Я",
        recognitionText: 'я',
        // gifSource: ISignVideo,
        gifSource: "https://media.spreadthesign.com/video/mp4/12/12788.mp4",
        imageSource: I,
    },
    {
        id: 3,
        text: "Любить",
        recognitionText: 'любовь',
        // gifSource: LoveSignVideo,
        gifSource: "https://media.spreadthesign.com/video/mp4/12/43672.mp4",
        imageSource: "https://img.freepik.com/free-vector/in-love-illustration-concept_114360-867.jpg?w=740&t=st=1696343075~exp=1696343675~hmac=b2f71632908f384437f68a1838ab5d32feb410145a728f1ac20332feb27bcc6d",
    },
    {
        id: 4,
        text: "Тебя",
        recognitionText: 'ты',
        // gifSource: YouSignVideo,
        gifSource: "https://media.spreadthesign.com/video/mp4/12/12804.mp4",
        imageSource: You,
    },
]

export const StartThemeTasks: taskType[] = [
    "SelectWord",
    "SelectGIFByWord",
    "MatchWordAndGIF"
]
