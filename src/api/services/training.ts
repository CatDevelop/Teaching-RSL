import { ApiUrlsConfig } from "../apiUrlsConfig";
import { http } from "../http";
import { CreateTestRequest } from "../../core/models/training/CreateTestRequest";
import { CreateTestRequestMapper } from "../../core/mappers/training/CreateTestRequestMapper";
import { CreateTestResponse } from "../../core/models/training/CreateTestResponse";
import { CreateTestResponseDto } from "../../core/dtos/training/CreateTestReaponseDto";
import { CreateTestResponseMapper } from "../../core/mappers/training/CreateTestResponseMapper";
import { GetTestResponse } from "../../core/models/training/GetTestResponse";
import { GetTestResponseDto } from "../../core/dtos/training/GetTestResponseDto";
import { GetTestResponseMapper } from "../../core/mappers/training/GetTestResponseMapper";
import { CreateUserTestRequest } from "core/models/training/CreateUserTestRequest";
import { CreateUserTestRequestMapper } from "core/mappers/training/CreateUserTestRequestMapper";

export namespace TrainingService {
    export async function postTrainingCreate(body: CreateTestRequest): Promise<CreateTestResponse> {
        const {data} = await http.post<CreateTestResponseDto>(ApiUrlsConfig.training.postTestCreate, CreateTestRequestMapper.toDto(body));
        return CreateTestResponseMapper.fromDto(data);
    }

    export async function getTraining(id: string): Promise<GetTestResponse> {
        const {data} = await http.get<GetTestResponseDto>(ApiUrlsConfig.training.getTest(id));
        return GetTestResponseMapper.fromDto(data);
    }

    export async function createUserTest(formData: CreateUserTestRequest): Promise<CreateTestResponse> {
        const {data} = await http.post<CreateTestResponseDto>(ApiUrlsConfig.training.postTestCreate, CreateUserTestRequestMapper.toDto(formData));
        return CreateTestResponseMapper.fromDto(data);
    }
}
