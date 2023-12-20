import {GetLevelTasksResponseDto} from "../dtos/learning/GetLevelTasksResponseDto";
import {shuffleArray} from "./shuffleArray";

export default function generateLearningLevel(levelTasks: GetLevelTasksResponseDto) {
    const levelWords = [
        ...levelTasks.singleTasks.map(singleTask => singleTask.rightSelect),
        ...levelTasks.multiTasks.map(multiTask => {
            return multiTask.conditions.map(condition => condition)
        }).flat()
    ]

    const theoryCache: string[] = []

    const levelTheoryTasks = shuffleArray(levelWords).map((word, index) => {
        if(!theoryCache.includes(word.wordId)) {
            theoryCache.push(word.wordId)
            return {
                id: index,
                type: "theory",
                task: word
            }
        }
    }).filter(task => task)

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

    return {
        theoryCount: levelTheoryTasks.length,
        practiceCount: levelPracticeTasks.length,
        tasks: [
            ...levelTheoryTasks,
            ...levelPracticeTasks
        ]
    }
}
