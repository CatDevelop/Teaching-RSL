/**
 * Тело запроса отправки результатов уровня
 */
export class SendLevelResultRequest {
    /**
     * Id уровня
     */
    public readonly levelId: string;

    /**
     * Выполненные слова
     */
    public readonly completedWords: string[];

    public constructor({levelId, completedWords}: SendLevelResultRequestProps){
        this.levelId = levelId;
        this.completedWords = completedWords;
    }
}

type SendLevelResultRequestProps = SendLevelResultRequest;
