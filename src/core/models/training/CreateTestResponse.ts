/**
 * Тело ответа создания теста.
 */
export class CreateTestResponse {

    /**
     * Id.
     */
    public readonly id: string;


    public constructor({id}:CreateTestResponseProps) {
        this.id = id;
    }
}

type CreateTestResponseProps = CreateTestResponse;
