import {MultiLevelTaskTypeEnum, SingleLevelTaskTypeEnum} from "./LevelTaskTypeEnum";

/**
 * Полученный тест.
 */
export class GetLevelTasksResponse {
    /**
     * Задания с одним ответом.
     */
    public readonly singleTasks: SingleLevelTask[];

    /**
     * Задания с множеством ответов.
     */
    public readonly multiTasks: MultiLevelTask[];

    public constructor({singleTasks, multiTasks}: GetLevelTasksResponseProps) {
        this.singleTasks = singleTasks;
        this.multiTasks = multiTasks;
    }
}

type GetLevelTasksResponseProps = GetLevelTasksResponse;

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
    public readonly rightSelect: WordRepresentations;

    /**
     * Другие варианты ответа.
     */
    public readonly otherSelects: (string | undefined)[];

    public constructor({type, rightSelect, otherSelects}: SingleLevelTaskProps) {
        this.type = type;
        this.rightSelect = rightSelect;
        this.otherSelects = otherSelects;
    }
}

type SingleLevelTaskProps = SingleLevelTask;

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
    public readonly conditions: WordRepresentations[];

    public constructor({type, conditions}: MultiLevelTaskProps) {
        this.type = type;
        this.conditions = conditions;
    }
}

type MultiLevelTaskProps = MultiLevelTask;


/**
 * Представления слова.
 */
export class WordRepresentations {
    /**
     * Id слова.
     */
    public readonly wordId: string;

    /**
     * Первое представление.
     */
    public readonly firstRepresentation: string | null;

    /**
     * Второе представление
     */
    public readonly secondRepresentation: string | null;

    public constructor({wordId, firstRepresentation, secondRepresentation}: WordRepresentationsProps) {
        this.wordId = wordId;
        this.firstRepresentation = firstRepresentation;
        this.secondRepresentation = secondRepresentation;
    }
}

type WordRepresentationsProps = WordRepresentations;

