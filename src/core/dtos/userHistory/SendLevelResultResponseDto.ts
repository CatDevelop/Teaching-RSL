/**
 * Тело запроса отправки результатов уровня.
 */
export type SendLevelResultRequestDto = Readonly<{
    /**
     * Id уровня.
     */
    levelId: string;

    /**
     * Выполненные слова.
     */
    completedWords: string[];
}>
