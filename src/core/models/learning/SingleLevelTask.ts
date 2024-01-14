import {SingleLevelTaskTypeEnum} from "./SingleLevelTaskTypeEnum";
import {GetWordResponse} from "../words/GetWordResponse";

/**
 * Задание с одним ответом.
 */
export class SingleLevelTask {
    /**
     * Тип задания.
     */
    public readonly type: SingleLevelTaskTypeEnum;

    /**
     * Правильный ответ.
     */
    public readonly rightSelect: GetWordResponse;

    /**
     * Другие варианты ответа.
     */
    public readonly otherSelects: GetWordResponse[];

    public constructor({type, rightSelect, otherSelects}: SingleLevelTaskProps) {
        this.type = type;
        this.rightSelect = rightSelect;
        this.otherSelects = otherSelects;
    }
}

type SingleLevelTaskProps = SingleLevelTask;
