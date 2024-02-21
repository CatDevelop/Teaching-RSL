export type UserLevelHistoryRecordResponseDto = Readonly<{
    /**
     * Id уровня
     */
    levelId: string;

    /**
     * Кол-во слов на уровне
     */
    levelWordsCount: number;

    /**
     * Кол-во пройденных слов
     */
    completedWordsCount: number;
}>