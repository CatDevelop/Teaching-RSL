/**
 * Полученный уровень.
 */
export class GetLevelResponse {
    /**
     * Название уровня.
     */
    public readonly levelName: string | null;

    /**
     * Название юнита.
     */
    public readonly unitName: string | null;

    /**
     * Название темы.
     */
    public readonly themeName: string | null;

    /**
     * Количество слов в уровне
     */
    public readonly wordsCount: number;

    /**
     * Id слов в уровне
     */
    public readonly wordsIdList: string[];

    public constructor({levelName, unitName, themeName,  wordsCount, wordsIdList}: GetLevelResponseProps) {
        this.levelName = levelName;
        this.unitName = unitName;
        this.themeName = themeName;
        this.wordsCount = wordsCount;
        this.wordsIdList = wordsIdList;
    }
}

type GetLevelResponseProps = GetLevelResponse;
