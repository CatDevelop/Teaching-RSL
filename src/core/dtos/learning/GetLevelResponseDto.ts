/**
 * Полученный уровень.
 */
export type GetLevelResponseDto = Readonly<{
    /**
     * Название уровня.
     */
    name: string | null;

    /**
     * Количество слов в уровне
     */
    wordsCount: number;

    /**
     * Id слов в уровне
     */
    wordsIdList: string[];
}>
