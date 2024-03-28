import React, {useCallback, useMemo} from 'react';
import {typedMemo} from "../../../core/utils/typedMemo";
import {useQuery} from "react-query";
import {UserService} from "../../../api/services/user";
import {
    achievementConfig, AchievementConfigItem,
    LearningScoreAchievement,
    PracticeScoreAchievement,
    TotalScoreAchievement
} from './achievementConfig'
import {enumToArray} from "../../../core/utils/enumToArray";

const LearningAchievementScores = enumToArray(LearningScoreAchievement)
const PracticeAchievementScores = enumToArray(PracticeScoreAchievement)
const TotalAchievementScores = enumToArray(TotalScoreAchievement)

export const AchievementListener = typedMemo(function AchievementListener() {
    const {data: scores} = useQuery(
        ['user-scores'],
        UserService.getWelcomeUserInfo,
        {
            onSuccess: data => {

            }
        }
    )
    const previousScores = useMemo(() => scores, [scores])

    const checkAchievement = useCallback<TAchievement>(
        (
            achievements: { [key in TAchievement]: AchievementConfigItem },
            scores: TAchievement[]) => {
            scores.forEach(score => {
                if(score)
            })
        }, [])

    return (
        <div>

        </div>
    );
};
