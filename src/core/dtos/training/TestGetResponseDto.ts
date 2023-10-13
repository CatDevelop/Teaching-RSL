/**
 * Полученный тест.
 */
export type TestGetResponseDto = Readonly<{

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
