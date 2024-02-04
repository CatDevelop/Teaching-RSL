/**
 * Раздел темы.
 */
export class GetUnitResponse {
    /**
     * Id.
     */
    public readonly id: string;

    /**
     * Название.
     */
    public readonly name: string;

    /**
     * Количество слов в разделе.
     */
    public readonly wordsCount: number;

    /**
     * Пройденное количество слов в разделе.
     */
    public readonly completedWordsCount?: number;

    public constructor({id, name, wordsCount, completedWordsCount}: GetUnitResponseProps){
        this.id = id;
        this.name = name;
        this.wordsCount = wordsCount;
        this.completedWordsCount = completedWordsCount;
    }
}

type GetUnitResponseProps = GetUnitResponse;
