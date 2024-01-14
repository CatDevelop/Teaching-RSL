import { IllustrationWordResponseDto } from "./IllustrationWordResponseDto";

/**
 * Модель слова
 */
export type GetWordResponseDto = Readonly<{
    /**
     * Идентификатор слова
     */
    id: string;

    /**
     * Слово
     */
    word: string | null;

    /**
     * Иллюстрации к слову
     */
    illustrations: readonly IllustrationWordResponseDto[];
}>
