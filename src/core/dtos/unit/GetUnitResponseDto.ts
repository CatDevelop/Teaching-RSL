/**
 * Раздел темы.
 */
export type GetUnitResponseDto = Readonly<{

    /**
     * Id.
     */
    id: string;

    /**
     * Название.
     */
    name: string;

    /**
     * Количество слов в разделе.
     */
    wordsCount: number;
}>
