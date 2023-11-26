import { ApiUrlsConfig } from "../apiUrlsConfig";
import { RegisterUserRequest } from "core/models/auth/RegisterUserRequest";
import { RegisterUserRequestMapper } from "core/mappers/auth/RegisterUserRequestMapper";
import { AuthService } from "./auth";
import { LoginUserRequest } from "core/models/auth/LoginUserRequest";
import { http } from "api/http";
import { UserTestHistoryRecordResponse } from "core/models/user/UserTestHistoryRecordResponse";
import { UserTestHistoryRecordResponseDto } from "core/dtos/user/UserTestHistoryRecordResponseDto";
import { UserTestHistoryRecordResponseMapper } from "core/mappers/user/UserTestHistoryRecordResponseMapper";

export namespace UserService {
    export async function register(form: RegisterUserRequest): Promise<void> {
        await http.post(ApiUrlsConfig.user.register, RegisterUserRequestMapper.toDto(form));
        await AuthService.connect(new LoginUserRequest({email: form.email, password: form.password}));
    }

    export async function login(form: LoginUserRequest): Promise<void> {
        await AuthService.connect(form);
    }

    export async function logout(): Promise<void> {
        await AuthService.disconnect();
    }

    export async function getTestHistory(): Promise<UserTestHistoryRecordResponse[]> {
        return http.get<UserTestHistoryRecordResponseDto[]>(ApiUrlsConfig.user.getTestHistory)
            .then(({data}) => data.map(item => UserTestHistoryRecordResponseMapper.fromDto(item)));
    }
}
