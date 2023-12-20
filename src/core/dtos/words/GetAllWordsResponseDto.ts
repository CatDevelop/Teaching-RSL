import {BlockType} from "../../models/words/BlockType";
import {WordResponseDto} from "./WordResponseDto";

/**
 * Модель получения всех слов
 */
export type GetAllWordsResponseDto = {
    /**
     * Тип блока
     */
    blockType: BlockType;

    /**
     * Id темы/раздела
     */
    id: string | null;

    /**
     * Название темы/раздела
     */
    name: string | null;

    /**
     * Слова
     */
    words: readonly WordResponseDto[];
}