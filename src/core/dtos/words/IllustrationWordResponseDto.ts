import { FileType } from "core/models/words/FileType";

/**
 * Иллюстрация к слову
 */
export type IllustrationWordResponseDto = Readonly<{
    /**
     * Ссылка на файл
     */
    path: FileType | null;

    /**
     * Тип файла
     */
    fileType: string | null;
}>