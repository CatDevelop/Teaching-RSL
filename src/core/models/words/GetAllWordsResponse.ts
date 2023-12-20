import {BlockType} from "./BlockType";
import {WordResponse} from "./WordResponse";

/**
 * Модель получения всех слов
 */
export class GetAllWordsResponse {
    /**
     * Тип блока
     */
    public readonly blockType: BlockType;

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
    public readonly words: readonly WordResponse[];

    public constructor({blockType, id, name, words}: GetAllWordsResponseProps){
        this.blockType = blockType;
        this.id = id;
        this.name = name;
        this.words = words;
    }
}

type GetAllWordsResponseProps = GetAllWordsResponse;