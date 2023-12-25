/**
 * Получение информации для приветственного сообщения, модель ответа
 */
export type GetWelcomeBackInfoResponseDto = Readonly<{
    /**
     * Имя
     */
    firstName: string | null;
    
    /**
     * Фамилия
     */
    lastName: string | null;
    
    /**
     * Почта
     */
    email: string | null;
    
    /**
     * Текущий уровень
     */
    level: number;
    
    /**
     * Количество опыта
     */
    scoresCount: number;
}>