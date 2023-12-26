import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {LearningService} from "../../api/services/learning";
import generateLearningLevel from "../utils/generateLearningLevel";

export type level = {
    theoryCount: number,
    practiceCount: number,
    tasks: any[]
}

export default function useLearningLevel(levelId: string) {
    const [level, setLevel] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const levelTasks = useQuery(
        ['learning/getleveltasks', levelId],
        () => LearningService.getLevelTasks(levelId ?? ''),
        {
            refetchOnWindowFocus: false
        }
    )

    useEffect(() => {
        if (levelTasks.isSuccess) {
            setLevel(generateLearningLevel(levelTasks.data))
            setIsLoading(false)
        }
    }, []);

    return {level, isLoading};
}
