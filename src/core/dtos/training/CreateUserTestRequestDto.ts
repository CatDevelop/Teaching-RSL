/**
 * Запрос на создание пользовательского теста
 */
export type CreateUserTestRequestDto = Readonly<{
    /**
     * Название теста
     */
    testName: string | null;
    
    /**
     * Слова теста
     */
    wordIdList: readonly string[];
}>