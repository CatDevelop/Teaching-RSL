export type UserThemeHistoryRecordResponseDto = Readonly<{
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
    wordsCount :number;

    /**
     * Количество пройденных слов в теме
     */
    wordsCompletedCount: number;
}>