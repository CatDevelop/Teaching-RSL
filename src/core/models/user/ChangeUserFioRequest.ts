export class ChangeUserFioRequest {
    /**
     * Новое имя
     */
    public readonly firstName: string;

    /**
     * Новая фамилия
     */
    public readonly lastName: string;

    public constructor({firstName, lastName}: ChangeUserFioRequestProps){
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

type ChangeUserFioRequestProps = ChangeUserFioRequest;