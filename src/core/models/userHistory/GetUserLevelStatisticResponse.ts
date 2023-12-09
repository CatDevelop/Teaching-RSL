/**
 * Получение статистики пользователя в обучении
 */
export class GetUserLevelStatisticResponse {
    /**
     * Количество пройденных уровней
     */
    public readonly completedLevelsCount: number;

    /**
     * Количество пройденных слов
     */
    public readonly completedWordsCount: number;

    /**
     * Количество трофеев
     */
    public readonly trophiesCount: number;

    public constructor({completedLevelsCount, completedWordsCount, trophiesCount}: GetUserLevelStatisticResponseProps){
        this.completedLevelsCount = completedLevelsCount;
        this.completedWordsCount = completedWordsCount;
        this.trophiesCount = trophiesCount;
    }
}

type GetUserLevelStatisticResponseProps = GetUserLevelStatisticResponse;