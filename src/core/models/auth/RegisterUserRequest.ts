/**
 * Запрос на регистрацию пользователя
 */
export class RegisterUserRequest{
    /**
     * Почта
     */
    public readonly email: string;

    /**
     * Имя
     */
    public readonly name: string;

    /**
     * Фамилия
     */
    public readonly surname: string;

    /**
     * Пароль
     */
    public readonly password: string;

    /**
     * Повторение пароля
     */
    public readonly confirmPassword: string;

    public constructor({email, name, surname, password, confirmPassword}: RegisterUserRequestProps){
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.password =  password;
        this.confirmPassword = confirmPassword;
    }
}

type RegisterUserRequestProps = RegisterUserRequest;