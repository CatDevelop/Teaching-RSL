import { FileType } from "core/models/words/FileType";

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
    fileType: FileType | null;
}>