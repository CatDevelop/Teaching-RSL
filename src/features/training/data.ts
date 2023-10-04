import { TestGetResponse } from "../../core/models/training/TestGetResponse";

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

export const testTemp: TestGetResponse = {
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