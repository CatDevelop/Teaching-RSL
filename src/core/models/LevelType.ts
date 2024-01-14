import {GetWordResponseDto} from "../dtos/words/GetWordResponseDto";
import {SingleLevelTaskTypeEnum} from "./learning/SingleLevelTaskTypeEnum";
import {MultiLevelTaskTypeEnum} from "./learning/MultiLevelTaskTypeEnum";
import {TheoryTaskTypeEnum} from "./learning/TheoryTaskTypeEnum";

export type learningLevel = {
    name: string,
    theoryCount: number,
    practiceCount: number,
    tasks: (theoryLevelTask | practiceLevelTask)[]
}

export type theoryLevelTask = { id: number, type: TheoryTaskTypeEnum, task: GetWordResponseDto };
export type practiceLevelTask = { id: number, task: { type: SingleLevelTaskTypeEnum, rightSelect: GetWordResponseDto, otherSelects: GetWordResponseDto[] } } |
    { id: number, task: { type: MultiLevelTaskTypeEnum, conditions: GetWordResponseDto[] } }



