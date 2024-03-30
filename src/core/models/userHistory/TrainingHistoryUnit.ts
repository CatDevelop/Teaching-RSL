/**
 * Юнит в истории прохождения тренировок
 */
export class TrainingHistoryUnit {
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
