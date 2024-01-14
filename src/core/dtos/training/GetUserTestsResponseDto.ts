import {GetTestResponseDto} from "./GetTestResponseDto";

/**
 * Ответ на получение всех тестов, созданных пользователем.
 */
export type GetUserTestsResponseDto = Readonly<{
    /**
     * Все тесты, созданные пользователем.
     */
    userTestList: GetTestResponseDto[];
}>
