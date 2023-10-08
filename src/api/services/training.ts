import { ApiUrlsConfig } from "../apiUrlsConfig";
import { http } from "../http";
import { GetThemeListWithUnitsResponseMapper } from "../../core/mappers/themes/GetThemeListWithUnitsResponseMapper";
import { CreateTestRequest } from "../../core/models/training/CreateTestRequest";
import { CreateTestRequestMapper } from "../../core/mappers/training/CreateTestRequestMapper";
import { GetThemeListWithUnitsResponse } from "../../core/models/themes/GetThemeListWithUnitsResponse";
import { GetThemeListWithUnitsResponseDto } from "../../core/dtos/themes/GetThemeListWithUnitsResponseDto";

export namespace TrainingService {

    export async function postTrainingCreate(body: CreateTestRequest): Promise<GetThemeListWithUnitsResponse> {
        const {data} = await http.post<GetThemeListWithUnitsResponseDto>(ApiUrlsConfig.training.postTestCreate, CreateTestRequestMapper.toDto(body));
        return GetThemeListWithUnitsResponseMapper.fromDto(data);
    }
}
