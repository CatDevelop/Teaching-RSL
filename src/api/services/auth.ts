import { ApiUrlsConfig } from "../apiUrlsConfig";
import { RegisterUserRequest } from "core/models/auth/RegisterUserRequest";
import { RegisterUserRequestMapper } from "core/mappers/auth/RegisterUserRequestMapper";
import { userHttp } from "api/userHttp";

export namespace AuthService {
    export async function register(form: RegisterUserRequest): Promise<void> {
        await userHttp.post(ApiUrlsConfig.user.register, RegisterUserRequestMapper.toDto(form));
    }
}
