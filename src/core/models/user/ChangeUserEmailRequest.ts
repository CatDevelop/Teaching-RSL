export class ChangeUserEmailRequest {
    /**
     * Почта пользователя
     */
    public readonly email: string;

    public constructor({email}:ChangeUserEmailRequestProps){
        this.email = email;
    }
}

type ChangeUserEmailRequestProps = ChangeUserEmailRequest;