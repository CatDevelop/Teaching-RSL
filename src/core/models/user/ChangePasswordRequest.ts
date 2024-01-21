/**
 * Запрос на смену пароля
 */
export class ChangePasswordRequest {
    /**
     * Старый пароль
     */
    public readonly oldPassword?: string;

    /**
     * Новый пароль
     */
    public readonly newPassword?: string;

    public constructor({oldPassword, newPassword}: ChangePasswordRequestProps){
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}

type ChangePasswordRequestProps = ChangePasswordRequest;