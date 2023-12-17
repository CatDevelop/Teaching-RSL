/**
 * Модель слова в рамках списка слов
 */
export type WordResponseDto = Readonly<{
    /**
     * Идентификатор слова
     */
    id:string;

    /**
     * Слово
     */
    word: string | null;
}>