/**
 * Лист тем.
 */
export class GetThemeListResponse {
    /**
     * Лист тем.
     */
    public readonly themeList: readonly GetThemeResponse[];

    public constructor({themeList}: GetThemeListResponseProps){
        this.themeList = themeList;
    }
}

type GetThemeListResponseProps = GetThemeListResponse;

/**
 * Тема.
 */
export class GetThemeResponse {

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

    public constructor({id, name, description, wordsCount}: GetThemeResponseProps){
        this.id = id;
        this.description = description;
        this.name = name;
        this.wordsCount = wordsCount;
    }
}

type GetThemeResponseProps = GetThemeResponse;
