import {Word} from "./models/Word";
import Hello from "../assets/images/ExhibitionStand/Привет.svg"
import I from "../assets/images/ExhibitionStand/Я.svg"
import You from "../assets/images/ExhibitionStand/Ты.png"
import Friend from "../assets/images/ExhibitionStand/Друг.svg"
import Love from "../assets/images/ExhibitionStand/Любовь.svg"
import HelloSignVideo from "../assets/video/ExhibitionStand/Привет.mp4"
import FriendSignVideo from "../assets/video/ExhibitionStand/Друг.mp4"
import ISignVideo from "../assets/video/ExhibitionStand/Я.mp4"
import LoveSignVideo from "../assets/video/ExhibitionStand/Люблю.mp4"
import YouSignVideo from "../assets/video/ExhibitionStand/Тебя.mp4"
import {GetTestResponse} from "./models/training/GetTestResponse";

export type taskType = "SelectWord" | "SelectImage" | "SelectGIFByWord" | "MatchWordAndGIF"
export const StartThemeWords: Word[] = [
    {
        id: 0,
        text: "Привет",
        recognitionText: 'привет',
        gifSource: HelloSignVideo,
        imageSource: Hello,
    },
    {
        id: 1,
        text: "Друг",
        recognitionText: 'друг',
        gifSource: FriendSignVideo,
        imageSource: Friend,
    },
    {
        id: 2,
        text: "Я",
        recognitionText: 'я',
        gifSource: ISignVideo,
        imageSource: I,
    },
    {
        id: 3,
        text: "Любить",
        recognitionText: 'любовь',
        gifSource: LoveSignVideo,
        imageSource: Love,
    },
    {
        id: 4,
        text: "Тебя",
        recognitionText: 'ты/тебя',
        gifSource: YouSignVideo,
        // gifSource: "https://media.spreadthesign.com/video/mp4/12/12804.mp4",
        imageSource: You,
    },
]

export const StartThemeTasks: taskType[] = [
    "SelectWord",
    "SelectImage",
    "SelectGIFByWord",
    "MatchWordAndGIF"
]

export const themes = [
    {
        id: '0',
        name: 'Семья',
        color: "rgba(174, 126, 222, 1)",
        tests: [
            {
                id:'0',
                name: 'Тест 1',
                wordsCount: 10,
                description: "dawdw",
            },
        ]
    },
];

export const userTests: any[] = [];

export const testTemp: GetTestResponse = {
    id:'0',
    name: 'Тест 1',
    words: [
        {
            id: '0',
            word: 'Привет'
        },
        {
            id: '1',
            word: 'Я'
        },
        {
            id: '2',
            word: 'Тебя'
        },
        {
            id: '3',
            word: 'Люблю'
        },
        {
            id: '4',
            word: 'Друг'
        }
    ]
}

