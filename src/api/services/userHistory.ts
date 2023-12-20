import { ApiUrlsConfig } from "../apiUrlsConfig";
import { http } from "api/http";
import { UserThemeHistoryRecordResponseDto } from "core/dtos/userHistory/UserThemeHistoryRecordResponseDto";
import { GetUserLevelStatisticResponseMapper } from "core/mappers/userHistory/GetUserLevelStatisticResponseMapper";
import { UserThemeHistoryRecordResponseMapper } from "core/mappers/userHistory/UserThemeHistoryRecordResponseMapper";
import { GetUserLevelStatisticResponse } from "core/models/userHistory/GetUserLevelStatisticResponse";

export namespace UserHistoryService {
    export async function getThemes(){
        const {data} = await http.get<UserThemeHistoryRecordResponseDto>(ApiUrlsConfig.userHistory.getThemes);
        return UserThemeHistoryRecordResponseMapper.fromDto(data);
    }

    export async function getStatistics(){
        const {data} = await http.get<GetUserLevelStatisticResponse>(ApiUrlsConfig.userHistory.getStatistics);
        return GetUserLevelStatisticResponseMapper.fromDto(data);
    }
}
