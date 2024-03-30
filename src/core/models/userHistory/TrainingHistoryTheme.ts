import {TrainingHistoryUnit} from "./TrainingHistoryUnit";

/**
 * Тема в истории прохождения тренировок
 */
export class TrainingHistoryTheme {
    /**
     * ID темы
     */
    public readonly themeId: string;

    /**
     * Название темы
     */
    public readonly themeName: string;

    /**
     * Количество слов в теме
     */
    public readonly wordCount: number;

    /**
     * Количество выученных слов в теме
     */
    public readonly completedWordCount: number;

    /**
     * Количество выученных слов в теме
     */
    public readonly unitInfoList: TrainingHistoryUnit[];


    public constructor({themeId, themeName, wordCount, completedWordCount, unitInfoList}: TrainingHistoryThemeProps) {
        this.themeId = themeId;
        this.themeName = themeName;
        this.wordCount = wordCount;
        this.completedWordCount = completedWordCount;
        this.unitInfoList = unitInfoList;
    }
}

type TrainingHistoryThemeProps = TrainingHistoryTheme;
