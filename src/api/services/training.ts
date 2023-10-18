import { ApiUrlsConfig } from "../apiUrlsConfig";
import { http } from "../http";
import { CreateTestRequest } from "../../core/models/training/CreateTestRequest";
import { CreateTestRequestMapper } from "../../core/mappers/training/CreateTestRequestMapper";
import { TestGetResponse } from "../../core/models/training/TestGetResponse";
import { TestGetResponseDto } from "../../core/dtos/training/TestGetResponseDto";
import { TestGetResponseMapper } from "../../core/mappers/training/TestGetResponseMapper";

export namespace TrainingService {
    export async function postTrainingCreate(body: CreateTestRequest): Promise<TestGetResponse> {
        const {data} = await http.post<TestGetResponseDto>(ApiUrlsConfig.training.postTestCreate, CreateTestRequestMapper.toDto(body));
        return TestGetResponseMapper.fromDto(data);
    }
}
