import { ApiUrlsConfig } from "../apiUrlsConfig";
import { http } from "../http";
import { RegisterUserRequest } from "core/models/auth/RegisterUserRequest";
import { RegisterUserRequestMapper } from "core/mappers/auth/RegisterUserRequestMapper";

export namespace AuthService {
    export async function register(form: RegisterUserRequest): Promise<void> {
        await http.post(ApiUrlsConfig.auth.register, RegisterUserRequestMapper.toDto(form));
    }
}
