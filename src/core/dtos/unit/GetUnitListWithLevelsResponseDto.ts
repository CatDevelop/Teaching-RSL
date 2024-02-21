/**
 * Лист разделов с уровнями.
 */
export type GetUnitListWithLevelsResponseDto = Readonly<{
    /**
     * Лист разделов с уровнями.
     */
    units: readonly GetUnitWithLevelsResponseDto[];
}>

/**
 * Раздел с уровнями.
 */
export type GetUnitWithLevelsResponseDto = Readonly<{
    /**
     * Id.
     */
    id: string;

    /**
     * Название.
     */
    name: string;

    /**
     * Количество слов в теме.
     */
    wordsCount: number;

    /**
     * Разделы.
     */
    levels: readonly GetLevelResponseDto[];
}>

/**
 * Уровень в разделе.
 */
export type GetLevelResponseDto = Readonly<{
    /**
     * Id.
     */
    id: string;

    /**
     * Название.
     */
    name: string;

    /**
     * Количество слов в уровне.
     */
    wordsCount: number;

    /**
     * Количество пройденных слов в уровне.
     */
    completedWordsCount?: number;
}>
