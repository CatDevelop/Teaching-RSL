/**
 * Получение истории прохождения практик
 */
export class GetTrainingHistoryResponse {
    /**
     * Список тем
     */
    public readonly themeInfoDalList: any[];

    public constructor({themeInfoDalList}: GetTrainingHistoryResponseProps){
        this.themeInfoDalList = themeInfoDalList;
    }
}

type GetTrainingHistoryResponseProps = GetTrainingHistoryResponse;
