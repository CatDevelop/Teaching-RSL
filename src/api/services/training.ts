import { ApiUrlsConfig } from "../apiUrlsConfig";
import { http } from "../http";
import { GetThemeListWithUnitsResponseMapper } from "../../core/mappers/themes/GetThemeListWithUnitsResponseMapper";
import { CreateTestRequest } from "../../core/models/training/CreateTestRequest";
import { CreateTestRequestMapper } from "../../core/mappers/training/CreateTestRequestMapper";

export namespace TrainingService {

    export async function postTrainingCreate(body: CreateTestRequest): Promise<unknown> {
        const {data} = await http.post<unknown>(ApiUrlsConfig.training.postTestCreate, CreateTestRequestMapper.toDto(body));
        return GetThemeListWithUnitsResponseMapper.fromDto(data);
    }
}
