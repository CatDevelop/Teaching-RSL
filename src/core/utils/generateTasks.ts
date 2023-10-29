import {Word} from "../models/Word";
import {shuffleArray} from "./shuffleArray";
import {TasksType} from "../models/Tasks";
import {taskType} from "../data";

type GenerateTasksType = (words: Word[], tasks: taskType[]) => TasksType[]

const getOtherWords = (words: Word[], currentWordIndex: number, count: number) => {
    let otherWords = [...words]
    otherWords.splice(currentWordIndex, 1)
    const shuffledOtherWords = shuffleArray<Word>(otherWords)
    return shuffledOtherWords.slice(0, count)
}

export const generateTasks: GenerateTasksType = (words, tasks) => {
    const shuffledWords = shuffleArray<Word>(words);
    const shuffledTasks = shuffleArray<taskType>(tasks);
    let results: TasksType[] = [];
    let taskIndex = 0;
    for (let task of shuffledTasks) {
        if (task === "SelectWord" || task === "SelectGIFByWord" || task === "SelectImage") {
            results.push({
                wordObject: shuffledWords[taskIndex % words.length],
                otherVariants: getOtherWords(shuffledWords, taskIndex % words.length, 3),
                type: task
            })
            taskIndex += 1;
        }

        if (task === "MatchWordAndGIF") {
            results.push({
                otherVariants: getOtherWords(shuffledWords, taskIndex % words.length, 3),
                type: task
            })
            taskIndex += 3;
        }
    }
    return results
}
