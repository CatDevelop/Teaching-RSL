import {ApiUrlsConfig} from "../apiUrlsConfig";
import {http} from "../http";
import {GetLevelTasksResponse} from "../../core/models/learning/GetLevelTasksResponse";
import {GetLevelTasksResponseMapper} from "../../core/mappers/learning/GetLevelTasksResponseMapper";
import {GetLevelTasksResponseDto} from "../../core/dtos/learning/GetLevelTasksResponseDto";
import {GetLevelResponseDto} from "../../core/dtos/learning/GetLevelResponseDto";
import {GetLevelResponse} from "../../core/models/learning/GetLevelResponse";
import {GetLevelResponseMapper} from "../../core/mappers/learning/GetLevelResponseMapper";

export namespace LearningService {
    export async function getLevelTasks(levelId: string): Promise<GetLevelTasksResponse> {
        const {data} = await http.get<GetLevelTasksResponseDto>(ApiUrlsConfig.learning.getLevelTasks(levelId));
        return GetLevelTasksResponseMapper.fromDto(data);
    }

    export async function getLevel(levelId: string): Promise<GetLevelResponse> {
        const {data} = await http.get<GetLevelResponseDto>(ApiUrlsConfig.learning.getLevel(levelId));
        return GetLevelResponseMapper.fromDto(data);
    }
}
