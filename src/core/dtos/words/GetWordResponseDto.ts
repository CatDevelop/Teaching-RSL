import { IllustrationWordResponseDto } from "./IllustrationWordResponseDto";

/**
 * Модель слова
 */
export type GetWordResponseDto = Readonly<{
    /**
     * Ответ со словами
     */
    description: string;	

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