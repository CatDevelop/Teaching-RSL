/**
 * Уровень в истории прохождения тренировок
 */
export class TrainingHistoryLevel {
    /**
     * ID уровня
     */
    public readonly levelId: string;

    /**
     * Название уровня
     */
    public readonly levelName: string;

    /**
     * Количество слов в уровне
     */
    public readonly wordCount: number;

    /**
     * Количество выученных слов в уровне
     */
    public readonly completedWordCount: number;

    public constructor({levelId, levelName, wordCount, completedWordCount}: TrainingHistoryLevelProps) {
        this.levelId = levelId;
        this.levelName = levelName;
        this.wordCount = wordCount;
        this.completedWordCount = completedWordCount;
    }
}

type TrainingHistoryLevelProps = TrainingHistoryLevel;
