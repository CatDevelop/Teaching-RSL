import { UserLevelHistoryRecordResponseDto } from "./UserLevelHistoryRecordResponseDto";

export type UserUnitWithLevelsHistoryRecordResponseDto = Readonly<{
    /**
     * Id раздела
     */
    unitId: string;

    /**
     * Имя раздела
     */
    unitName: string | null;

    /**
     * Кол-во слов в разделе
     */
    unitWordsCount: number;

    /**
     * Уровни
     */
    levelsHistory: UserLevelHistoryRecordResponseDto[];
}>