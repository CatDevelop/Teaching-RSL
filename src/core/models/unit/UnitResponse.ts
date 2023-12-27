import {WordResponseDto} from "../../dtos/words/WordResponseDto";

/**
 * Раздел темы
 */
export class UnitResponse{
    /**
     * Id раздела
     */
    public readonly id: string;

    /**
     * Название раздела
     */
    public readonly name: string | null;

    /**
     * Слова раздела
     */
    public readonly words: WordResponseDto[] | null;

    public constructor({id, name, words}: UnitResponseProps) {
        this.id = id;
        this.name = name;
        this.words = words;
    }
}

type UnitResponseProps = UnitResponse;