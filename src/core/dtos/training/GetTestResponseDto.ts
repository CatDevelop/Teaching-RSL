import { TestTypeEnum } from "../../models/themes/TestTypeEnum";

/**
 * Полученный тест.
 */
export type GetTestResponseDto = Readonly<{

    /**
     * Id.
     */
    id: string;

    /**
     * Название.
     */
    name: string;

    /**
     * Слова в тесте.
     */
    words: readonly WordInTestDto[];

    /**
     * Тип теста
     */
    testType: TestTypeEnum;
}>

/**
 * Слово в тесте.
 */
export type WordInTestDto = Readonly<{

    /**
     * Id.
     */
    id: string;

    /**
     * Слово.
     */
    word: string;
}>
