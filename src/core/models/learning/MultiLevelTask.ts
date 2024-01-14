import {MultiLevelTaskTypeEnum} from "./MultiLevelTaskTypeEnum";
import {GetWordResponse} from "../words/GetWordResponse";

/**
 * Задание с множеством ответом.
 */
export class MultiLevelTask {
    /**
     * Тип задания.
     */
    public readonly type: MultiLevelTaskTypeEnum;

    /**
     * Условия задания.
     */
    public readonly conditions: GetWordResponse[];

    public constructor({type, conditions}: MultiLevelTaskProps) {
        this.type = type;
        this.conditions = conditions;
    }
}

type MultiLevelTaskProps = MultiLevelTask;
