import {ApiUrlsConfig} from "../apiUrlsConfig";
import {http} from "../http";
import {GetLevelTasksResponse} from "../../core/models/learning/GetLevelTasksResponse";
import {GetLevelTasksResponseMapper} from "../../core/mappers/learning/GetLevelTasksResponseMapper";
import {GetLevelTasksResponseDto} from "../../core/dtos/learning/GetLevelTasksResponseDto";

export namespace LearningService {
    export async function getLevelTasks(levelId: string): Promise<GetLevelTasksResponse> {
        const {data} = await http.get<GetLevelTasksResponseDto>(ApiUrlsConfig.learning.getLevelTasks(levelId));
        return GetLevelTasksResponseMapper.fromDto(data);
    }
}
