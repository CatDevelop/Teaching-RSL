/**
 * Запрос на создание пользовательского теста
 */
export class CreateUserTestRequest {
    /**
     * Название теста
     */
    public readonly testName: string | null;
    
    /**
     * Слова теста
     */
    public wordIdList?: readonly string[];

    public constructor({testName, wordIdList}:CreateUserTestRequestProps){
        this.testName = testName;
        this.wordIdList = wordIdList;
    }
}

type CreateUserTestRequestProps = CreateUserTestRequest;