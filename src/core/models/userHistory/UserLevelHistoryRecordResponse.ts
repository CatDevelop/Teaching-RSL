export class UserLevelHistoryRecordResponse {
    /**
     * Id уровня
     */
    public readonly levelId: string;

    /**
     * Кол-во слов на уровне
     */
    public readonly levelWordsCount: number;

    /**
     * Кол-во пройденных слов
     */
    public readonly completedWordsCount: number;

    public constructor({
        levelId, 
        levelWordsCount, 
        completedWordsCount
    }: UserLevelHistoryRecordResponseProps) {
        this.levelId = levelId;
        this.levelWordsCount = levelWordsCount;
        this.completedWordsCount = completedWordsCount;
    }
}

type UserLevelHistoryRecordResponseProps = UserLevelHistoryRecordResponse;
