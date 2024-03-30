/**
 * Получение информации для приветственного сообщения, модель ответа
 */
export class GetWelcomeBackInfoResponse {
    /**
     * Имя
     */
    public readonly firstName: string | null;

    /**
     * Фамилия
     */
    public readonly lastName: string | null;

    /**
     * Почта
     */
    public readonly email: string | null;

    /**
     * Текущий уровень
     */
    public readonly level: number;

    /**
     * Прогресс по практикам
     */
    public readonly progressCountTraining: number;

    /**
     * Прогресс по обучению
     */
    public readonly progressCountLearning: number;

    /**
     * Общий прогресс
     */
    public readonly progressCountAll: number;

    /**
     * Максимальный опыт в текущем уровне
     */
    public readonly maxLevelExperience: number;

    /**
     * Опыт пользователя
     */
    public readonly userExperience: number;

    public constructor({
        firstName,
        lastName,
        email,
        level,
        progressCountLearning,
        progressCountTraining,
        progressCountAll,
        maxLevelExperience,
        userExperience
    }: GetWelcomeBackInfoResponseProps) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.level = level;
        this.progressCountLearning = progressCountLearning;
        this.progressCountTraining = progressCountTraining;
        this.progressCountAll = progressCountAll;
        this.maxLevelExperience = maxLevelExperience;
        this.userExperience = userExperience;
    }
}

type GetWelcomeBackInfoResponseProps = GetWelcomeBackInfoResponse;
