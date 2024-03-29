import { GetUnitResponse } from "../unit/GetUnitResponse";

/**
 * Лист тем.
 */
export class GetThemeListWithUnitsResponse {
    /**
     * Лист тем.
     */
    public readonly themeList: readonly GetThemeWithUnitsResponse[];

    public constructor({themeList}: GetThemeListWithUnitsResponseProps){
        this.themeList = themeList;
    }
}

type GetThemeListWithUnitsResponseProps = GetThemeListWithUnitsResponse;

/**
 * Тема.
 */
export class GetThemeWithUnitsResponse {
    /**
     * Id.
     */
    public readonly id: string;

    /**
     * Название.
     */
    public readonly name: string;

    /**
     * Описание.
     */
    public readonly description: string;

    /**
     * Количество слов в теме.
     */
    public readonly wordsCount: number;

    /**
     * Пройденное количество слов в теме.
     */
    public completedWordsCount?: number;

    /**
     * Разделы.
     */
    public readonly units: readonly GetUnitResponse[];

    public constructor({id, name, description, wordsCount, units, completedWordsCount}: GetThemeWithUnitsResponseProps){
        this.id = id;
        this.description = description;
        this.name = name;
        this.units = units;
        this.wordsCount = wordsCount;
        this.completedWordsCount = completedWordsCount;
    }
}

type GetThemeWithUnitsResponseProps = GetThemeWithUnitsResponse;
