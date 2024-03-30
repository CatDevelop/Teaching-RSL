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
     * Прогресс по практикам
     */
    progressCountTraining: number;

    /**
     * Прогресс по обучению
     */
    progressCountLearning: number;

    /**
     * Общий прогресс
     */
    progressCountAll: number;

    /**
     * Максимальный опыт в текущем уровне
     */
    maxLevelExperience: number;

    /**
     * Опыт пользователя
     */
    userExperience: number;
}>
