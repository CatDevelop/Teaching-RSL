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
    public readonly trainingType: TestTypeEnum;

    /**
     * Количество слов в тесте.
     */
    public readonly wordsCount: number;

    public constructor({id, trainingType, wordsCount}:CreateTestRequestProps) {
        this.id = id;
        this.trainingType = trainingType;
        this.wordsCount = wordsCount;
    }
}

type CreateTestRequestProps = CreateTestRequest;
