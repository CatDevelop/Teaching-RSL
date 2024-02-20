import { UserUnitWithLevelsHistoryRecordResponseDto } from "./UserUnitWithLevelsHistoryRecordResponseDto";

export type UserFullHistoryRecordResponseDto = Readonly<{
    /**
     * Id темы
     */
    themeId: string;

    /**
     * Название темы
     */
    themeName: string | null;

    /**
     * Количество слов в теме
     */
    wordsCount: number;

    /**
     * Количество пройденных слов в теме
     */
    wordsCompletedCount: number;

    /**
     * Разделы
     */
    unitsHistory: UserUnitWithLevelsHistoryRecordResponseDto[];
}>