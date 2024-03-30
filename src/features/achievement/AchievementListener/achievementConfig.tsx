import React from 'react';
import {LearningScoreAchievement, TotalScoreAchievement, PracticeScoreAchievement} from './achievementValues'
import type {AchievementConfigItem} from './AchievementConfigItem'
import {ReactComponent as BronzeAchievementIcon} from 'assets/images/BronzeAchievementIcon.svg'
import {ReactComponent as SilverAchievementIcon} from 'assets/images/SilverAchievementIcon.svg'
import {ReactComponent as GoldAchievementIcon} from 'assets/images/GoldAchievementIcon.svg'
import {ReactComponent as DiamondAchievementIcon} from 'assets/images/DiamondAchievementIcon.svg'
import classes from './AchievementListener.module.css'

type AchievementConfig = {
    learning: {
        [key in LearningScoreAchievement]: AchievementConfigItem;
    },
    practice: {
        [key in PracticeScoreAchievement]: AchievementConfigItem;
    }
    total: {
        [key in TotalScoreAchievement]: AchievementConfigItem;
    }
}

export const achievementConfig: AchievementConfig = {
    learning: {
        [LearningScoreAchievement.Bronze]: {
            name: 'Взрывной словарный запас',
            image: <BronzeAchievementIcon/>,
            toastClassName: classes.bronzeAchievementToast
        },
        [LearningScoreAchievement.Silver]: {
            name: 'Мастер словесного искусства',
            image: <SilverAchievementIcon/>,
            toastClassName: classes.silverAchievementToast
        },
        [LearningScoreAchievement.Gold]: {
            name: 'Суперпловец в океане жестов',
            image: <GoldAchievementIcon/>,
            toastClassName: classes.goldAchievementToast
        },
        [LearningScoreAchievement.Diamond]: {
            name: 'Легионер словесной революции',
            image: <DiamondAchievementIcon/>,
            toastClassName: classes.diamondAchievementToast
        },
    },
    practice: {
        [LearningScoreAchievement.Bronze]: {
            name: 'Неуязвимый практикант',
            image: <BronzeAchievementIcon/>,
            toastClassName: classes.bronzeAchievementToast
        },
        [LearningScoreAchievement.Silver]: {
            name: 'Бац, и почти эксперт',
            image: <SilverAchievementIcon/>,
            toastClassName: classes.silverAchievementToast
        },
        [LearningScoreAchievement.Gold]: {
            name: 'Легенда продвижения',
            image: <GoldAchievementIcon/>,
            toastClassName: classes.goldAchievementToast
        },
        [LearningScoreAchievement.Diamond]: {
            name: 'Жестоман',
            image: <DiamondAchievementIcon/>,
            toastClassName: classes.diamondAchievementToast
        },
    },
    total: {
        [TotalScoreAchievement.Bronze]: {
            name: 'Хайповый пользователь',
            image: <BronzeAchievementIcon/>,
            toastClassName: classes.bronzeAchievementToast
        },
        [TotalScoreAchievement.Silver]: {
            name: 'Энергичный мозговой тренажер',
            image: <SilverAchievementIcon/>,
            toastClassName: classes.silverAchievementToast
        },
        [TotalScoreAchievement.Gold]: {
            name: 'Жестовая зависимость',
            image: <GoldAchievementIcon/>,
            toastClassName: classes.goldAchievementToast
        },
        [TotalScoreAchievement.Diamond]: {
            name: 'Прогрессомания',
            image: <DiamondAchievementIcon/>,
            toastClassName: classes.diamondAchievementToast
        },
    },
}
