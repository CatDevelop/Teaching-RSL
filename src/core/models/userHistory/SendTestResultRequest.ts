/**
 * Тело запроса отправки результатов теста
 */
export class SendTestResultRequest {
    /**
     * Id теста
     */
    public readonly testId: string;

    /**
     * ID пропущенных слов
     */
    public readonly incorrectWords: string[];

    public constructor({testId, incorrectWords}: SendTestResultRequestProps){
        this.testId = testId;
        this.incorrectWords = incorrectWords;
    }
}

type SendTestResultRequestProps = SendTestResultRequest;
