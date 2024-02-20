export class UserThemeHistoryRecordResponse {
    /**
     * Id темы
     */
    public readonly themeId: string;

    /**
     * Название темы
     */
    public readonly themeName: string | null;

    /**
     * Описание темы
     */
    public readonly description: string | null;

    /**
     * Количество слов в теме
     */
    public readonly wordsCount :number;

    /**
     * Количество пройденных слов в теме
     */
    public readonly wordsCompletedCount: number;

    public constructor({themeId, themeName, wordsCount,wordsCompletedCount, description}: UserThemeHistoryRecordResponseProps){
        this.themeId = themeId;
        this.themeName = themeName;
        this.wordsCompletedCount = wordsCompletedCount;
        this.wordsCount = wordsCount;
        this.description = description
    }
}

type UserThemeHistoryRecordResponseProps = UserThemeHistoryRecordResponse;