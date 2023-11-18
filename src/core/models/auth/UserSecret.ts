/**
 * Токены пользователя
 */
export type UserSecret = Readonly<{
    /**
     * Токен авторизации
     */
    access: string;

    /**
     * Токен обновления
     */
    refresh: string;
}>