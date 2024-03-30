import {enumToArray} from "../../../../core/utils/enumToArray";

export enum LearningScoreAchievement {
    Bronze = 10,
    Silver = 35,
    Gold = 75,
    Diamond = 150,
}

export enum PracticeScoreAchievement {
    Bronze = 10,
    Silver = 35,
    Gold = 75,
    Diamond = 150,
}

export enum TotalScoreAchievement {
    Bronze = 20,
    Silver = 50,
    Gold = 100,
    Diamond = 200,
}

export const LearningAchievementScores = enumToArray(LearningScoreAchievement)
export const PracticeAchievementScores = enumToArray(PracticeScoreAchievement)
export const TotalAchievementScores = enumToArray(TotalScoreAchievement)
