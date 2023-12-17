/**
 * Модель слова в рамках списка слов
 */
export class WordResponse {
    /**
     * Идентификатор слова
     */
    public readonly id:string;

    /**
     * Слово
     */
    public readonly word: string | null;

    public constructor({id, word}: WordResponseProps){
        this.id= id;
        this.word = word
    }
}

type WordResponseProps = WordResponse;