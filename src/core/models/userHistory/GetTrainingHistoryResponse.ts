import {TrainingHistoryTheme} from "./TrainingHistoryTheme";

/**
 * Получение истории прохождения практик
 */
export class GetTrainingHistoryResponse {
    /**
     * Список тем
     */
    public readonly themeInfoDalList: TrainingHistoryTheme[];

    public constructor({themeInfoDalList}: GetTrainingHistoryResponseProps) {
        this.themeInfoDalList = themeInfoDalList;
    }
}

type GetTrainingHistoryResponseProps = GetTrainingHistoryResponse;


