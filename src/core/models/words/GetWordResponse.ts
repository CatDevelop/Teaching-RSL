import { IllustrationWordResponse } from "./IllustrationWordResponse";

/**
 * Модель слова
 */
export class GetWordResponse {
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
        this.id = props.id;
        this.word = props.word;
        this.illustrations = props.illustrations
    }
}

type GetWordResponseProps = GetWordResponse;
