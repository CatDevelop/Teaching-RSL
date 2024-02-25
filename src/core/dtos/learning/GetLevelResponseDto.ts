/**
 * Полученный уровень.
 */
export type GetLevelResponseDto = Readonly<{
    /**
     * Название уровня.
     */
    levelName: string | null;

    /**
     * Название юнита.
     */
    unitName: string | null;

    /**
     * Название темы.
     */
    themeName: string | null;

    /**
     * Количество слов в уровне
     */
    wordsCount: number;

    /**
     * Id слов в уровне
     */
    wordsIdList: string[];
}>
