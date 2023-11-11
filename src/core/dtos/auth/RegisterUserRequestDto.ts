/**
 * Запрос на регистрацию пользователя DTO
 */
export type RegisterUserRequestDto = Readonly<{
    /**
     * Почта
     */
    email: string;

    /**
     * Имя
     */
    name: string;

    /**
     * Фамилия
     */
    surname: string;

    /**
     * Пароль
     */
    password: string;
}>