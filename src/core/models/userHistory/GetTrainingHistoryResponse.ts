/**
 * Получение истории прохождения практик
 */
export class GetTrainingHistoryResponse {
    /**
     * Список тем
     */
    public readonly themeInfoDalList: TrainingHistoryTheme[];

    public constructor({themeInfoDalList}: GetTrainingHistoryResponseProps) {
        this.themeInfoDalList = themeInfoDalList;
    }
}

type GetTrainingHistoryResponseProps = GetTrainingHistoryResponse;


/**
 * Тема в истории прохождения тренировок
 */
class TrainingHistoryTheme {
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


/**
 * Юнит в истории прохождения тренировок
 */
class TrainingHistoryUnit {
    /**
     * ID юнита
     */
    public readonly unitId: string;

    /**
     * Название юнита
     */
    public readonly unitName: string;

    /**
     * Количество слов в юните
     */
    public readonly wordCount: number;

    /**
     * Количество выученных слов в юните
     */
    public readonly completedWordCount: number;

    public constructor({unitId, unitName, wordCount, completedWordCount}: TrainingHistoryUnitProps) {
        this.unitId = unitId;
        this.unitName = unitName;
        this.wordCount = wordCount;
        this.completedWordCount = completedWordCount;
    }
}

type TrainingHistoryUnitProps = TrainingHistoryUnit;
