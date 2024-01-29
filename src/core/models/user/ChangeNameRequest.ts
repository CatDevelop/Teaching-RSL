/**
 * Запрос на смену имени
 */
export class ChangeNameRequest {
    /**
     * Имя
     */
    public readonly name: string;

    /**
     * Фамилия
     */
    public readonly surname: string;

    public constructor({name, surname}: ChangeNameRequestProps){
        this.name = name;
        this.surname = surname;
    }
}

type ChangeNameRequestProps = ChangeNameRequest;
