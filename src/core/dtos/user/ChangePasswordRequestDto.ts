/**
 * Запрос на смену пароля
 */
export type ChangePasswordRequestDto = Readonly<{
    /**
     * Старый пароль
     */
    oldPassword: string | null;

    /**
     * Новый пароль
     */
    newPassword: string | null;
}>