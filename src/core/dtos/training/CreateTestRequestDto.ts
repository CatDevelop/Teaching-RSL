import { TestTypeEnum } from "../../models/themes/TestTypeEnum";

/**
 * Тело запроса создания теста.
 */
export type CreateTestRequestDto = Readonly<{

    /**
     * Id.
     */
    id: string;

    /**
     * Тип теста.
     */
    testType: TestTypeEnum;

    /**
     * Количество слов в тесте.
     */
    wordsCount: number;
}>
