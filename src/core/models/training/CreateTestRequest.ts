import { TestTypeEnum } from "../themes/TestTypeEnum";

/**
 * Тело запроса создания теста.
 */
export class CreateTestRequest {

    /**
     * Id.
     */
    public readonly id: string;

    /**
     * Тип теста.
     */
    public readonly testType: TestTypeEnum;

    /**
     * Количество слов в тесте.
     */
    public readonly wordsCount: number;

    public constructor({id, testType, wordsCount}:CreateTestRequestProps) {
        this.id = id;
        this.testType = testType;
        this.wordsCount = wordsCount;
    }
}

type CreateTestRequestProps = CreateTestRequest;
