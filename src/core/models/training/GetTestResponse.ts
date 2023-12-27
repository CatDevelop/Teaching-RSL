/**
 * Полученный тест.
 */
export class GetTestResponse {
    /**
     * Id.
     */
    public readonly id: string;

    /**
     * Название.
     */
    public readonly name: string;

    /**
     * Слова в тесте.
     */
    public readonly words: readonly WordInTest[];

    public constructor({id, name, words}: GetTestResponseProps) {
        this.id = id;
        this.name = name;
        this.words = words;
    }
}

type GetTestResponseProps = GetTestResponse;

/**
 * Слово в тесте.
 */
export class WordInTest {

    /**
     * Id.
     */
    public readonly id: string;

    /**
     * Слово.
     */
    public readonly word: string | null;

    /**
     * Распознанные слова
     */
    public recognitionText?: string;

    public constructor({id, word}: WordInTestProps) {
        this.id = id;
        this.word = word;
    }
}

type WordInTestProps = WordInTest;
