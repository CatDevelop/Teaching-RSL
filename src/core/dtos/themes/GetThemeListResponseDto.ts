/**
 * Лист тем.
 */
export type GetThemeListResponseDto = Readonly<{

    /**
     * Лист тем.
     */
    themeList: readonly GetThemeResponseDto[];
}>

/**
 * Тема.
 */
export type GetThemeResponseDto = Readonly<{

    /**
     * Id.
     */
    id: string;

    /**
     * Название.
     */
    name: string;

    /**
     * Описание.
     */
    description: string;

    /**
     * Количество слов в теме.
     */
    wordsCount: number;
}>
