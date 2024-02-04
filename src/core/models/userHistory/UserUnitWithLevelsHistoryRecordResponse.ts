import { UserLevelHistoryRecordResponse } from "./UserLevelHistoryRecordResponse";

export class UserUnitWithLevelsHistoryRecordResponse {
    /**
     * Id раздела
     */
    public readonly unitId: string;

    /**
     * Имя раздела
     */
    public readonly unitName: string | null;

    /**
     * Кол-во слов в разделе
     */
    public readonly unitWordsCount: number;

    /**
     * Уровни
     */
    public readonly levelsHistory: UserLevelHistoryRecordResponse[];

    public constructor({unitId, unitName, unitWordsCount,levelsHistory}: UserUnitWithLevelsHistoryRecordResponseProps){
        this.unitId = unitId;
        this.unitName = unitName;
        this.unitWordsCount = unitWordsCount;
        this.levelsHistory = levelsHistory;
    }
}

type UserUnitWithLevelsHistoryRecordResponseProps = UserUnitWithLevelsHistoryRecordResponse;