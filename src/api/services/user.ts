import { ApiUrlsConfig } from "../apiUrlsConfig";
import { RegisterUserRequest } from "core/models/auth/RegisterUserRequest";
import { RegisterUserRequestMapper } from "core/mappers/auth/RegisterUserRequestMapper";
import { userHttp } from "api/userHttp";
import { AuthService } from "./auth";
import { LoginUserRequest } from "core/models/auth/LoginUserRequest";

export namespace UserService {
    export async function register(form: RegisterUserRequest): Promise<void> {
        await userHttp.post(ApiUrlsConfig.user.register, RegisterUserRequestMapper.toDto(form));
        await AuthService.connect(new LoginUserRequest({email: form.email, password: form.password}));
    }

    export async function login(form: LoginUserRequest): Promise<void> {
        await AuthService.connect(form);
    }

    export async function logout(): Promise<void> {
        await AuthService.disconnect();
    }
}