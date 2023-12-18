/**
 * Получение истории прохождения тестов, одна запись, модель ответа
 */
export class UserTestHistoryRecordResponse {
    /**
     * Id записи истории
     */
    public readonly userTestHistoryId: string;
    
    /**
     * Навзание теста
     */
    public readonly name: string | null;
    
    /**
     * Пользовательский тест или нет
     */
    public readonly isUserTest:	boolean;
    
    /**
     * Количество слов в тесте
     */
    public readonly wordsCount: number;
    
    /**
     * Количество правильно отвеченных слов
     */
    public readonly wordsCompletedCount: number;
    
    /**
     * Дата и время прохождения
     */
    public readonly completedDateTime: string;

    public constructor({
        userTestHistoryId,
        name,
        isUserTest,
        wordsCount,
        wordsCompletedCount,
        completedDateTime,
    }: UserTestHistoryRecordResponseProps){
        this.userTestHistoryId = userTestHistoryId;
        this.name = name;
        this.isUserTest = isUserTest;
        this.wordsCount = wordsCount;
        this.wordsCompletedCount = wordsCompletedCount;
        this.completedDateTime = completedDateTime;
    }
}

type UserTestHistoryRecordResponseProps = UserTestHistoryRecordResponse;