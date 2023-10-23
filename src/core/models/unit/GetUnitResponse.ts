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

    public constructor({id, name, wordsCount}: GetUnitResponseProps){
        this.id = id;
        this.name = name;
        this.wordsCount = wordsCount;
    }
}

type GetUnitResponseProps = GetUnitResponse;
