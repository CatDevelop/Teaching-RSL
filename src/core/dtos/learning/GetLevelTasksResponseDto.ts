import {MultiLevelTaskTypeEnum, SingleLevelTaskTypeEnum} from "../../models/learning/LevelTaskTypeEnum";

/**
 * Полученные задания.
 */
export type GetLevelTasksResponseDto = Readonly<{
    /**
     * Задания с одним ответом.
     */
    singleTasks: SingleLevelTaskDto[];

    /**
     * Задания с множеством ответов.
     */
    multiTasks: MultiLevelTaskDto[];
}>

/**
 * Задание с одним ответом.
 */
export type SingleLevelTaskDto = Readonly<{
    /**
     * Тип задания.
     */
    type: SingleLevelTaskTypeEnum;

    /**
     * Правильный ответ.
     */
    rightSelect: WordRepresentationsDto;

    /**
     * Другие варианты ответа.
     */
    otherSelects: (string | undefined)[];
}>

/**
 * Задание с множеством ответов.
 */
export type MultiLevelTaskDto = Readonly<{
    /**
     * Тип задания.
     */
    type: MultiLevelTaskTypeEnum;

    /**
     * Условия задания.
     */
    conditions: WordRepresentationsDto[];
}>

/**
 * Представления слова.
 */
export type WordRepresentationsDto = Readonly<{
    /**
     * Id слова.
     */
    wordId: string;

    /**
     * Первое представление.
     */
    firstRepresentation: string | null;

    /**
     * Второе представление
     */
    secondRepresentation: string | null;
}>
