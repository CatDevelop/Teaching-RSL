/**
 * Получение истории прохождения тестов, одна запись, модель ответа
 */
export type UserTestHistoryRecordResponseDto = Readonly<{
    /**
     * Id записи истории
     */
    userTestHistoryId: string;
    
    /**
     * Навзание теста
     */
    name: string | null;
    
    /**
     * Пользовательский тест или нет
     */
    isUserTest:	boolean;
    
    /**
     * Количество слов в тесте
     */
    wordsCount: number;
    
    /**
     * Количество правильно отвеченных слов
     */
    wordsCompletedCount: number;
    
    /**
     * Дата и время прохождения
     */
    completedDateTime: string;
}>