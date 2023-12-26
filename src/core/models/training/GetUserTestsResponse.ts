import {GetTestResponse} from "./GetTestResponse";

/**
 * Ответ на получение всех тестов, созданных пользователем.
 */
export class GetUserTestsResponse {
    /**
     * Все тесты, созданные пользователем.
     */
    public readonly userTestList: GetTestResponse[];

    public constructor({userTestList}: GetUserTestsResponseProps) {
        this.userTestList = userTestList;
    }
}

type GetUserTestsResponseProps = GetUserTestsResponse;
