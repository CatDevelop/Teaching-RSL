/**
 * Запрос на смену пароля
 */
export class ChangePasswordRequest {
    /**
     * Старый пароль
     */
    public readonly oldPassword: string | null;

    /**
     * Новый пароль
     */
    public readonly newPassword: string | null;

    public constructor({oldPassword, newPassword}: ChangePasswordRequestProps){
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}

type ChangePasswordRequestProps = ChangePasswordRequest;