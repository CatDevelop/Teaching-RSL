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
     * Количество слов в теме
     */
    public readonly wordsCount :number;

    /**
     * Количество пройденных слов в теме
     */
    public readonly wordsCompletedCount: number;

    public constructor({themeId, themeName, wordsCount,wordsCompletedCount}: UserThemeHistoryRecordResponseProps){
        this.themeId = themeId;
        this.themeName = themeName;
        this.wordsCompletedCount = wordsCompletedCount;
        this.wordsCount = wordsCount;
    }
}

type UserThemeHistoryRecordResponseProps = UserThemeHistoryRecordResponse;