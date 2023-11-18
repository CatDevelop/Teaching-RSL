/**
 * Иллюстрация к слову
 */
export type IllustrationWordResponseDto = Readonly<{
    /**
     * Ссылка на файл
     */
    path: string | null;

    /**
     * Тип файла
     */
    fileType: string | null;
}>