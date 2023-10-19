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
    trainingType: TestTypeEnum;

    /**
     * Количество слов в тесте.
     */
    wordsCount: number;
}>
