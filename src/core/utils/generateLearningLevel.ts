import {GetLevelTasksResponseDto} from "../dtos/learning/GetLevelTasksResponseDto";
import {shuffleArray} from "./shuffleArray";
import {GetLevelResponseDto} from "../dtos/learning/GetLevelResponseDto";
import {learningLevel, theoryLevelTask} from "../models/LevelType";
import {TheoryTaskTypeEnum} from "../models/learning/TheoryTaskTypeEnum";
import {WordFormServer2} from "../models/Word";

export default function generateLearningLevel(levelMetadata: GetLevelResponseDto, levelTasks: GetLevelTasksResponseDto): learningLevel {
    const levelWords = [
        ...levelTasks.singleTasks.map(singleTask => [singleTask.rightSelect, ...singleTask.otherSelects]).flat(),
        ...levelTasks.multiTasks.map(multiTask => {
            return multiTask.conditions.map(condition => condition)
        }).flat()
    ]
    console.log(levelWords)

    const theoryCache: string[] = []

    const levelTheoryTasks: theoryLevelTask[] = shuffleArray(levelWords).map((word, index) => {
        if (!theoryCache.includes(word.id)) {
            theoryCache.push(word.id)
            return {
                id: theoryCache.length - 1,
                type: TheoryTaskTypeEnum.Theory,
                task: word
            }
        }
        return {id: -2, type: TheoryTaskTypeEnum.Theory, task: word}
    }).filter(task => task.id !== -2)

    const levelPracticeTasks = shuffleArray(
        [
            ...levelTasks.singleTasks,
            ...levelTasks.multiTasks
        ]
    ).map((task, index) => {
        return {
            id: index + levelTheoryTasks.length,
            task
        }
    })

    return <learningLevel>{
        name: levelMetadata.unitName + " - " + levelMetadata.levelName || "",
        theoryCount: levelTheoryTasks.length,
        practiceCount: levelPracticeTasks.length,
        tasks: [
            ...levelTheoryTasks,
            ...levelPracticeTasks
        ]
    }
}
