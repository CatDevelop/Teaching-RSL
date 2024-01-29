/**
 * Тело запроса отправки результатов уровня.
 */
export type SendTestResultRequestDto = Readonly<{
    /**
     * Id теста
     */
    testId: string;

    /**
     * Id пропущенных слов
     */
    incorrectWords: readonly string[];
}>
