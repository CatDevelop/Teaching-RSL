import {UnitResponse} from "../unit/UnitResponse";

/**
 * Модель получения всех слов
 */
export class GetAllWordsResponse {
    /**
     * Id темы/раздела
     */
    public readonly id: string | null;

    /**
     * Название темы/раздела
     */
    public readonly name: string | null;

    /**
     * Слова
     */
    public readonly units: readonly UnitResponse[];

    public constructor({units, id, name}: GetAllWordsResponseProps){
        this.id = id;
        this.name = name;
        this.units = units;
    }
}

type GetAllWordsResponseProps = GetAllWordsResponse;