import {AchievementConfigItem} from "../components/AchievementListener/AchievementConfigItem";
import {useQuery} from "react-query";
import {achievementQueryKey} from "../components/AchievementListener";
import {UserService} from "api/services/user";
import {achievementConfig} from "../components/AchievementListener/achievementConfig";
import {useCallback, useMemo} from "react";
import {
    LearningAchievementScores,
    PracticeAchievementScores,
    TotalAchievementScores
} from "../components/AchievementListener/achievementValues";

/**
 * Хук, возвращающий текущие достижения пользователя
 */
export function useAchievements(): AchievementConfigItem[] {
    const {data: user} = useQuery(
        achievementQueryKey,
        UserService.getWelcomeUserInfo,
        {
            suspense: false,
            refetchOnWindowFocus: false
        }
    )

    const getAchievement = useCallback((
        achievements: { [key: number]: AchievementConfigItem },
        scores: number[],
        currentScore: number
    ): AchievementConfigItem => {
        let currentScoreLevel: number = 0
        for (let i = 0; i < scores.length; i++) {
            if (scores[i] > currentScore) {
                break
            }
            currentScoreLevel = scores[i]
        }

        return achievements[currentScoreLevel]
    }, [])


    const getAchievements = useCallback((
        achievements: { [key: number]: AchievementConfigItem },
        scores: number[],
        currentScore: number
    ): AchievementConfigItem[] => {
        const result: AchievementConfigItem[] = []
        for (let i = 0; i < scores.length; i++) {
            if (scores[i] > currentScore) {
                break
            }
            result.push(achievements[scores[i]])
        }

        return result
    }, [])

    return useMemo(() => (
        user ?
            [
                ...getAchievements(achievementConfig.total, TotalAchievementScores, user!.progressCountAll),
                ...getAchievements(achievementConfig.learning, LearningAchievementScores, user!.progressCountLearning),
                ...getAchievements(achievementConfig.practice, PracticeAchievementScores, user!.progressCountTraining),
            ].filter(Boolean) :
            []
    ), [user])
}
