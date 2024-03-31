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
            description: 'Вы заработали 10 очков в обучении!',
            image: <BronzeAchievementIcon/>,
            toastClassName: classes.bronzeAchievementToast
        },
        [LearningScoreAchievement.Silver]: {
            name: 'Мастер словесного искусства',
            description: 'Вы заработали 35 очков в обучении!',
            image: <SilverAchievementIcon/>,
            toastClassName: classes.silverAchievementToast
        },
        [LearningScoreAchievement.Gold]: {
            name: 'Суперпловец в океане жестов',
            description: 'Вы заработали 75 очков в обучении!',
            image: <GoldAchievementIcon/>,
            toastClassName: classes.goldAchievementToast
        },
        [LearningScoreAchievement.Diamond]: {
            name: 'Легионер словесной революции',
            description: 'Вы заработали 150 очков в обучении!',
            image: <DiamondAchievementIcon/>,
            toastClassName: classes.diamondAchievementToast
        },
    },
    practice: {
        [PracticeScoreAchievement.Bronze]: {
            name: 'Неуязвимый практикант',
            description: 'Вы заработали 10 очков в практиках!',
            image: <BronzeAchievementIcon/>,
            toastClassName: classes.bronzeAchievementToast
        },
        [PracticeScoreAchievement.Silver]: {
            name: 'Бац, и почти эксперт',
            description: 'Вы заработали 35 очков в практиках!',
            image: <SilverAchievementIcon/>,
            toastClassName: classes.silverAchievementToast
        },
        [PracticeScoreAchievement.Gold]: {
            name: 'Легенда продвижения',
            description: 'Вы заработали 75 очков в практиках!',
            image: <GoldAchievementIcon/>,
            toastClassName: classes.goldAchievementToast
        },
        [PracticeScoreAchievement.Diamond]: {
            name: 'Жестоман',
            description: 'Вы заработали 150 очков в практиках!',
            image: <DiamondAchievementIcon/>,
            toastClassName: classes.diamondAchievementToast
        },
    },
    total: {
        [TotalScoreAchievement.Bronze]: {
            name: 'Хайповый пользователь',
            description: 'Вы заработали 20 очков общего прогресса!',
            image: <BronzeAchievementIcon/>,
            toastClassName: classes.bronzeAchievementToast
        },
        [TotalScoreAchievement.Silver]: {
            name: 'Энергичный мозговой тренажер',
            description: 'Вы заработали 50 очков общего прогресса!',
            image: <SilverAchievementIcon/>,
            toastClassName: classes.silverAchievementToast
        },
        [TotalScoreAchievement.Gold]: {
            name: 'Жестовая зависимость',
            description: 'Вы заработали 100 очков общего прогресса!',
            image: <GoldAchievementIcon/>,
            toastClassName: classes.goldAchievementToast
        },
        [TotalScoreAchievement.Diamond]: {
            name: 'Прогрессомания',
            description: 'Вы заработали 200 очков общего прогресса!',
            image: <DiamondAchievementIcon/>,
            toastClassName: classes.diamondAchievementToast
        },
    },
}
