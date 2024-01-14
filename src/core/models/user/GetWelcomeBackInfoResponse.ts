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
     * Количество опыта
     */
    public readonly scoresCount: number;

    public constructor({
        firstName,
        lastName,
        email,
        level,
        scoresCount,
    }: GetWelcomeBackInfoResponseProps) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.level = level;
        this.scoresCount = scoresCount;
    }
}

type GetWelcomeBackInfoResponseProps = GetWelcomeBackInfoResponse;