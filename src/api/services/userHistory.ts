import {ApiUrlsConfig} from "../apiUrlsConfig";
import {http} from "api/http";
import {UserThemeHistoryRecordResponseDto} from "core/dtos/userHistory/UserThemeHistoryRecordResponseDto";
import {GetUserLevelStatisticResponseMapper} from "core/mappers/userHistory/GetUserLevelStatisticResponseMapper";
import {UserThemeHistoryRecordResponseMapper} from "core/mappers/userHistory/UserThemeHistoryRecordResponseMapper";
import {GetUserLevelStatisticResponse} from "core/models/userHistory/GetUserLevelStatisticResponse";
import {SendLevelResultRequestMapper} from "../../core/mappers/userHistory/SendLevelResultRequestMapper";
import {SendLevelResultRequest} from "../../core/models/userHistory/SendLevelResultRequest";
import {SendLevelResultRequestDto} from "../../core/dtos/userHistory/SendLevelResultResponseDto";
import {SendTestResultRequest} from "../../core/models/userHistory/SendTestResultRequest";
import {SendTestResultRequestMapper} from "../../core/mappers/userHistory/SendTestResultRequestMapper";
import {GetTrainingHistoryResponse} from "../../core/models/userHistory/GetTrainingHistoryResponse";
import {GetTrainingHistoryResponseMapper} from "../../core/mappers/userHistory/GetTrainingHistoryResponseMapper";
import {GetTestResponseDto} from "../../core/dtos/training/GetTestResponseDto";
import {GetTestResponseMapper} from "../../core/mappers/training/GetTestResponseMapper";
import {TestTypeEnum} from "../../core/models/themes/TestTypeEnum";

export namespace UserHistoryService {
    export async function getThemes() {
        const {data} = await http.get<UserThemeHistoryRecordResponseDto>(ApiUrlsConfig.userHistory.getThemes);
        return UserThemeHistoryRecordResponseMapper.fromDto(data);
    }

    export async function getStatistics() {
        const {data} = await http.get<GetUserLevelStatisticResponse>(ApiUrlsConfig.userHistory.getStatistics);
        return GetUserLevelStatisticResponseMapper.fromDto(data);
    }

    export async function sendLevelResult(formData: SendLevelResultRequest): Promise<void> {
        await http.post<SendLevelResultRequestDto>(
            ApiUrlsConfig.userHistory.sendLevelResult,
            SendLevelResultRequestMapper.toDTO(formData)
        );
    }

    export async function sendTestResult(formData: SendTestResultRequest): Promise<void> {
        await http.post(
            ApiUrlsConfig.userHistory.sendTestResult,
            SendTestResultRequestMapper.toDTO(formData)
        )
    }

    export async function getTrainingHistory() {
        try {
            const {data} = await http.get<GetTrainingHistoryResponse>(ApiUrlsConfig.userHistory.getTrainingHistory);
            return GetTrainingHistoryResponseMapper.fromDto(data);
        } catch {
            return GetTrainingHistoryResponseMapper.fromDto({themeInfoDalList: []});
        }
    }
}
