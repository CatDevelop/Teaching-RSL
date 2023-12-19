import { IllustrationWordResponse } from "./IllustrationWordResponse";

/**
 * Модель слова
 */
export class GetWordResponse {
    /**
     * Ответ со словами
     */
    public readonly description: string;	

    /**
     * Идентификатор слова
     */
    public readonly id: string;

    /**
     * Слово
     */
    public readonly word: string | null;

    /**
     * Иллюстрации к слову
     */
    public readonly illustrations: readonly IllustrationWordResponse[];

    public constructor(props: GetWordResponseProps){
        this.description = props.description;
        this.id = props.id;
        this.word = props.word;
        this.illustrations = props.illustrations
    }
}

type GetWordResponseProps = GetWordResponse;