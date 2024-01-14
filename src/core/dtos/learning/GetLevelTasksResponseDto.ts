import {SingleLevelTaskTypeEnum} from "../../models/learning/SingleLevelTaskTypeEnum";
import {MultiLevelTaskTypeEnum} from "../../models/learning/MultiLevelTaskTypeEnum";
import {GetWordResponseDto} from "../words/GetWordResponseDto";

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
    rightSelect: GetWordResponseDto;

    /**
     * Другие варианты ответа.
     */
    otherSelects: GetWordResponseDto[];
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
    conditions: GetWordResponseDto[];
}>
