/**
 * Иллюстрация к слову
 */
export class IllustrationWordResponse {
    /**
     * Ссылка на файл
     */
    public readonly path: string | null;

    /**
     * Тип файла
     */
    public readonly fileType: string | null;

    public constructor({path, fileType}:IllustrationWordResponseProps){
        this.path = path;
        this.fileType = fileType;
    }
}

type IllustrationWordResponseProps = IllustrationWordResponse;