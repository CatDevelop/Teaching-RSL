/**
 * Данные для входа в систему
 */
export class LoginUserRequest {
    /**
     * Логин (почта)
     */
    public readonly email: string;

    /**
     * Пароль
     */
    public readonly password: string;
    
    public constructor({email, password}: LoginUserRequestProps){
        this.email = email;
        this.password = password;
    }
}

type LoginUserRequestProps = LoginUserRequest;