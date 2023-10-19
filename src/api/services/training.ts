import { ApiUrlsConfig } from "../apiUrlsConfig";
import { http } from "../http";
import { CreateTestRequest } from "../../core/models/training/CreateTestRequest";
import { CreateTestRequestMapper } from "../../core/mappers/training/CreateTestRequestMapper";
import { CreateTestResponse } from "../../core/models/training/CreateTestResponse";
import { CreateTestResponseDto } from "../../core/dtos/training/CreateTestReaponseDto";
import { CreateTestResponseMapper } from "../../core/mappers/training/CreateTestResponseMapper";

export namespace TrainingService {
    export async function postTrainingCreate(body: CreateTestRequest): Promise<CreateTestResponse> {
        const {data} = await http.post<CreateTestResponseDto>(ApiUrlsConfig.training.postTestCreate, CreateTestRequestMapper.toDto(body));
        return CreateTestResponseMapper.fromDto(data);
    }
}
