import React, {useCallback, useRef} from 'react';
import {typedMemo} from "../../../../core/utils/typedMemo";
import {useQuery} from "react-query";
import {UserService} from "../../../../api/services/user";
import {
    LearningAchievementScores,
    PracticeAchievementScores,
    TotalAchievementScores
} from './achievementValues'
import {AchievementConfigItem} from "./AchievementConfigItem";
import {achievementConfig} from "./achievementConfig";
import {toast} from "react-toastify";
import {AchievementToast} from "./AchievementToast/AchievementToast";
import {GetWelcomeBackInfoResponse} from "../../../../core/models/user/GetWelcomeBackInfoResponse";
import {achievementQueryKey} from "./achievementQueryKey";

/**
 * Наблюдатель достижений
 */
export const AchievementListener = typedMemo(function AchievementListener() {
    const checkAchievement = useCallback(
        <TAchievement extends number, >(
            achievements: { [key: number]: AchievementConfigItem },
            scores: TAchievement[],
            currentScore: number,
            prevScore: number,
        ) => {
            for(let i = 0; i < scores.length; i++){
                let score = scores[i];

                if (score <= currentScore && score > prevScore) {
                    toast(
                        <AchievementToast
                            image={achievements[score].image}
                            name={achievements[score].name}
                        />,
                        {
                            className: achievements[score].toastClassName,
                            autoClose: false,
                            position: 'top-right',
                        })
                    break
                }
            }
        }, [])

    const previousScores = useRef<GetWelcomeBackInfoResponse | null>(null);

    const _ = useQuery(
        achievementQueryKey,
        UserService.getWelcomeUserInfo,
        {
            suspense: false,
            refetchOnWindowFocus: false,
            onSuccess: data => {
                checkAchievement(
                    achievementConfig.learning,
                    LearningAchievementScores,
                    data.progressCountLearning,
                    previousScores.current?.progressCountLearning ?? data.progressCountLearning
                )

                checkAchievement(
                    achievementConfig.practice,
                    PracticeAchievementScores,
                    data.progressCountTraining,
                    previousScores.current?.progressCountTraining ?? data.progressCountTraining
                )

                checkAchievement(
                    achievementConfig.total,
                    TotalAchievementScores,
                    data.progressCountAll,
                    previousScores.current?.progressCountAll ?? data.progressCountAll
                )

                previousScores.current = data;
            }
        }
    )

    return null;
});
