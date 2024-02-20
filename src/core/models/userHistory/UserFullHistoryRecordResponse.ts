import { UserUnitWithLevelsHistoryRecordResponse } from "./UserUnitWithLevelsHistoryRecordResponse";

export class UserFullHistoryRecordResponse {
    /**
     * Id темы
     */
    public readonly themeId: string;

    /**
     * Название темы
     */
    public readonly themeName: string | null;

    /**
     * Количество слов в теме
     */
    public readonly wordsCount: number;

    /**
     * Количество пройденных слов в теме
     */
    public readonly wordsCompletedCount: number;

    /**
     * Разделы
     */
    public readonly unitsHistory: UserUnitWithLevelsHistoryRecordResponse[];

    public constructor({themeId, themeName, wordsCount,wordsCompletedCount, unitsHistory}: UserFullHistoryRecordResponseProps){
        this.themeId = themeId;
        this.themeName = themeName;
        this.wordsCompletedCount = wordsCompletedCount;
        this.wordsCount = wordsCount;
        this.unitsHistory = unitsHistory;
    }
}

type UserFullHistoryRecordResponseProps = UserFullHistoryRecordResponse;