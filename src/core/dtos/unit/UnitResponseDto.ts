import {WordResponseDto} from "../words/WordResponseDto";

/**
 * Раздел темы
 */
export type UnitResponseDto = {
    /**
     * Id раздела
     */
    id: string;

    /**
     * Название раздела
     */
    name: string | null;

    /**
     * Слова раздела
     */
    words: WordResponseDto[] | null;
}