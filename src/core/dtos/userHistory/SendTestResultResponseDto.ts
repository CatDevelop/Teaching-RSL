/**
 * Тело запроса отправки результатов уровня.
 */
export type SendTestResultRequestDto = Readonly<{
    /**
     * Id теста
     */
    testId: string;

    /**
     * ID пропущенных слов
     */
    incorrectWords: string[];
}>
