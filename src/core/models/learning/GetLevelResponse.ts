/**
 * Полученный уровень.
 */
export class GetLevelResponse {
    /**
     * Название уровня.
     */
    public readonly name: string | null;

    /**
     * Количество слов в уровне
     */
    public readonly wordsCount: number;

    /**
     * Id слов в уровне
     */
    public readonly wordsIdList: string[];

    public constructor({name, wordsCount, wordsIdList}: GetLevelResponseProps) {
        this.name = name;
        this.wordsCount = wordsCount;
        this.wordsIdList = wordsIdList;
    }
}

type GetLevelResponseProps = GetLevelResponse;
