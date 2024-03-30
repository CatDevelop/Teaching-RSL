import {AchievementConfigItem} from "../components/AchievementListener/AchievementConfigItem";
import {useQuery} from "react-query";
import {achievementQueryKey} from "../components/AchievementListener/achievementQueryKey";
import {UserService} from "../../../api/services/user";
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
            const score = scores[i]
            if (score <= currentScore) {
                currentScoreLevel = score
            } else {
                break
            }
        }

        return achievements[currentScoreLevel]
    }, [])

    return useMemo(() => (
        user ?
            [
                getAchievement(achievementConfig.total, TotalAchievementScores, user!.progressCountAll),
                getAchievement(achievementConfig.learning, LearningAchievementScores, user!.progressCountLearning),
                getAchievement(achievementConfig.practice, PracticeAchievementScores, user!.progressCountTraining),
            ] :
            []
    ), [user])
}
