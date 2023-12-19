/**
 * Получение статистики пользователя в обучении
 */
export type GetUserLevelStatisticResponseDto = Readonly<{
    /**
     * Количество пройденных уровней
     */
    completedLevelsCount: number;

    /**
     * Количество пройденных слов
     */
    completedWordsCount: number;

    /**
     * Количество трофеев
     */
    trophiesCount: number;
}>