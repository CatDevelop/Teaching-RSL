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
            name: 'Explosive vocabulary',
            description: 'You earned 10 points in learning!',
            image: <BronzeAchievementIcon/>,
            toastClassName: classes.bronzeAchievementToast
        },
        [LearningScoreAchievement.Silver]: {
            name: 'Master of Verbal Arts',
            description: 'You earned 35 points in learning!',
            image: <SilverAchievementIcon/>,
            toastClassName: classes.silverAchievementToast
        },
        [LearningScoreAchievement.Gold]: {
            name: 'Super swimmer in an ocean of sings',
            description: 'You earned 75 points in learning!',
            image: <GoldAchievementIcon/>,
            toastClassName: classes.goldAchievementToast
        },
        [LearningScoreAchievement.Diamond]: {
            name: 'Legionnaire of the verbal revolution',
            description: 'You earned 150 points in learning!',
            image: <DiamondAchievementIcon/>,
            toastClassName: classes.diamondAchievementToast
        },
    },
    practice: {
        [PracticeScoreAchievement.Bronze]: {
            name: 'Invulnerable Trainee',
            description: 'You earned 10 points in training!',
            image: <BronzeAchievementIcon/>,
            toastClassName: classes.bronzeAchievementToast
        },
        [PracticeScoreAchievement.Silver]: {
            name: 'Bam, and almost an expert',
            description: 'You earned 35 points in training!',
            image: <SilverAchievementIcon/>,
            toastClassName: classes.silverAchievementToast
        },
        [PracticeScoreAchievement.Gold]: {
            name: 'Promotion Legend',
            description: 'You earned 75 points in training!',
            image: <GoldAchievementIcon/>,
            toastClassName: classes.goldAchievementToast
        },
        [PracticeScoreAchievement.Diamond]: {
            name: 'Signoman',
            description: 'You earned 150 points in training!',
            image: <DiamondAchievementIcon/>,
            toastClassName: classes.diamondAchievementToast
        },
    },
    total: {
        [TotalScoreAchievement.Bronze]: {
            name: 'Hype user',
            description: 'You earned 20 total progress points!',
            image: <BronzeAchievementIcon/>,
            toastClassName: classes.bronzeAchievementToast
        },
        [TotalScoreAchievement.Silver]: {
            name: 'Energetic Brain Trainer',
            description: 'You earned 50 total progress points!',
            image: <SilverAchievementIcon/>,
            toastClassName: classes.silverAchievementToast
        },
        [TotalScoreAchievement.Gold]: {
            name: 'Signs addiction',
            description: 'You earned 100 total progress points!',
            image: <GoldAchievementIcon/>,
            toastClassName: classes.goldAchievementToast
        },
        [TotalScoreAchievement.Diamond]: {
            name: 'Progressomania',
            description: 'You earned 200 total progress points!',
            image: <DiamondAchievementIcon/>,
            toastClassName: classes.diamondAchievementToast
        },
    },
}
