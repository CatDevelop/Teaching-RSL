import {LevelSingleTaskTypeEnum} from "../../models/learning/LevelTaskTypeEnum";

/**
 * Полученные задания.
 */
export type GetLevelTasksResponseDto = Readonly<{
    /**
     * Задания с одним ответом.
     */
    singleTasks: LevelSingleTaskDto[];

    /**
     * Задания с множеством ответов.
     */
    multiTasks: string;
}>

/**
 * Задание с одним ответом.
 */
export type LevelSingleTaskDto = Readonly<{
    /**
     * Тип задания.
     */
    type: LevelSingleTaskTypeEnum;

    /**
     * Правильный ответ.
     */
    rightSelect: {
        "wordId": string,
        "firstRepresentation": string,
        "secondRepresentation": string
    };

    /**
     * Остальные ответы.
     */
    otherSelects: string[];
}>
