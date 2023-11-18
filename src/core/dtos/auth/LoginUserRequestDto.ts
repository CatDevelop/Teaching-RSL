/**
 * Данные для входа в систему
 */
export type LoginUserRequestDto = Readonly<{
    /**
     * Логин (почта)
     */
    username: string;

    /**
     * Пароль
     */
    password: string;
}>