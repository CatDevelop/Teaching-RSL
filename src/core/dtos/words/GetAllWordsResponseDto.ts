import {UnitResponseDto} from "../unit/UnitResponseDto";

/**
 * Модель получения всех слов
 */
export type GetAllWordsResponseDto = {
    /**
     * Разделы
     */
    units: UnitResponseDto[];

    /**
     * Id темы/раздела
     */
    id: string | null;

    /**
     * Название темы/раздела
     */
    name: string | null;
}