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
    public readonly comletedWordsCount: number;

    public constructor({
        levelId, 
        levelWordsCount, 
        comletedWordsCount
    }: UserLevelHistoryRecordResponseProps) {
        this.levelId = levelId;
        this.levelWordsCount = levelWordsCount;
        this.comletedWordsCount = comletedWordsCount;
    }
}

type UserLevelHistoryRecordResponseProps = UserLevelHistoryRecordResponse;
