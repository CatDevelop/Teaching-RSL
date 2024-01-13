import {ApiUrlsConfig} from "../apiUrlsConfig";
import { RegisterUserRequest } from "core/models/auth/RegisterUserRequest";
import { RegisterUserRequestMapper } from "core/mappers/auth/RegisterUserRequestMapper";
import { AuthService } from "./auth";
import { LoginUserRequest } from "core/models/auth/LoginUserRequest";
import { http } from "api/http";
import { ChangePasswordRequest } from "core/models/user/ChangePasswordRequest";
import { ChangePasswordRequestMapper } from "core/mappers/user/ChangePasswordRequestMapper";
import { UserTestHistoryRecordResponse } from "core/models/user/UserTestHistoryRecordResponse";
import { UserTestHistoryRecordResponseDto } from "core/dtos/user/UserTestHistoryRecordResponseDto";
import { UserTestHistoryRecordResponseMapper } from "core/mappers/user/UserTestHistoryRecordResponseMapper";
import { GetWelcomeBackInfoResponse } from "core/models/user/GetWelcomeBackInfoResponse";
import { GetWelcomeBackInfoResponseMapper } from "core/mappers/user/GetWelcomeBackInfoResponseMapper";
import { UserThemeHistoryRecordResponse } from "core/models/userHistory/UserThemeHistoryRecordResponse";
import { UserThemeHistoryRecordResponseMapper } from "core/mappers/userHistory/UserThemeHistoryRecordResponseMapper";
import { UserThemeHistoryRecordResponseDto } from "core/dtos/userHistory/UserThemeHistoryRecordResponseDto";

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

    export async function changePassword(form: ChangePasswordRequest): Promise<void> {
        await http.patch(ApiUrlsConfig.user.changePassword, ChangePasswordRequestMapper.toDto(form));
    }

    export async function restorePassword(email: string): Promise<void> {
        await http.patch(ApiUrlsConfig.user.restorePassword(email));
    }

    export async function getTestHistory(): Promise<UserTestHistoryRecordResponse[]> {
        return http.get<UserTestHistoryRecordResponseDto[]>(ApiUrlsConfig.userHistory.getTestHistory)
            .then(({data}) => data.map(item => UserTestHistoryRecordResponseMapper.fromDto(item)));
    }
    
    export async function getThemesHistory(): Promise<UserThemeHistoryRecordResponse[]> {
        return http.get<UserThemeHistoryRecordResponseDto[]>(ApiUrlsConfig.userHistory.getThemes)
            .then(({data}) => data.map(item => UserThemeHistoryRecordResponseMapper.fromDto(item)));
    }

    export async function getWelcomeUserInfo(): Promise<GetWelcomeBackInfoResponse> {
        return http.get<GetWelcomeBackInfoResponse>(ApiUrlsConfig.user.getWelcomeUserInfo)
            .then(({data}) => GetWelcomeBackInfoResponseMapper.fromDto(data));
    }
}
