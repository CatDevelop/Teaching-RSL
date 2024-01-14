import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {LearningService} from "../../api/services/learning";
import generateLearningLevel from "../utils/generateLearningLevel";

export type level = {
    name: string,
    theoryCount: number,
    practiceCount: number,
    tasks: any[]
}

/**
 * Хук реализует получение заданий для обучения с сервера
 *
 * Id уровня
 * @param levelId
 */
export default function useLearningLevel(levelId: string) {
    const initialLevel = {
        name: "",
        theoryCount: 0,
        practiceCount: 0,
        tasks: []
    }
    const [level, setLevel] = useState<level>(initialLevel);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const levelMetadata = useQuery(
        ['learning/getlevel', levelId],
        () => LearningService.getLevel(levelId ?? ''),
        {
            refetchOnWindowFocus: false
        }
    )

    const levelTasks = useQuery(
        ['learning/getleveltasks', levelId],
        () => LearningService.getLevelTasks(levelId ?? ''),
        {
            refetchOnWindowFocus: false
        }
    )

    useEffect(() => {
        if (levelMetadata.isSuccess && levelTasks.isSuccess) {
            setLevel(generateLearningLevel(levelMetadata.data, levelTasks.data))
            setIsLoading(false)
        }
    }, []);

    return {level, isLoading};
}
