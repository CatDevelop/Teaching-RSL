import { LoginUserRequest } from "core/models/auth/LoginUserRequest";
import { ApiUrlsConfig } from "../apiUrlsConfig";
import { LoginUserRequestMapper } from "core/mappers/auth/LoginUserRequestMapper";
import { AuthClientResponseDto } from "core/dtos/auth/AuthClientResponseDto";
import { UserSecretService } from "./userSecret";
import { authHttp } from "api/authHttp";

export namespace AuthService {
    export async function connect(form: LoginUserRequest): Promise<void> {
        const body = {
            ...LoginUserRequestMapper.toDto(form),
            client_id: 'client',
            client_secret: 'pin-code',
            grant_type: 'password',
        }
        const {data} = await authHttp.post<AuthClientResponseDto>(ApiUrlsConfig.auth.connect, body);
        UserSecretService.saveToken({access: data.access_token, refresh: data.refresh_token});
    }

    export async function disconnect(): Promise<void>{
        await UserSecretService.destroyToken();
    }
}
