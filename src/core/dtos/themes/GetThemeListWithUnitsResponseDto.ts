import { GetUnitResponseDto } from "../GetUnitResponseDto";

/**
 * Лист тем.
 */
export type GetThemeListWithUnitsResponseDto = Readonly<{

    /**
     * Лист тем.
     */
    themeList: readonly GetThemeWithUnitsResponseDto[];
}>

/**
 * Тема.
 */
export type GetThemeWithUnitsResponseDto = Readonly<{

    /**
     * Id.
     */
    id: string;

    /**
     * Название.
     */
    name: string;

    /**
     * Описание.
     */
    description: string;

    /**
     * Количество слов в теме.
     */
    wordsCount: number;

    /**
     * Разделы.
     */
    units: readonly GetUnitResponseDto[];
}>
