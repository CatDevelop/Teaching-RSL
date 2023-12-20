import {LoginUserRequest} from "core/models/auth/LoginUserRequest";
import {ApiUrlsConfig} from "../apiUrlsConfig";
import {LoginUserRequestMapper} from "core/mappers/auth/LoginUserRequestMapper";
import {AuthClientResponseDto} from "core/dtos/auth/AuthClientResponseDto";
import {UserSecretService} from "./userSecret";
import {http} from "api/http";

export namespace AuthService {
    export async function connect(form: LoginUserRequest): Promise<void> {
        const body = {
            ...LoginUserRequestMapper.toDto(form),
            client_id: 'client',
            client_secret: 'pin-code',
            grant_type: 'password',
        }
        const {data} = await http.post<AuthClientResponseDto>(
            ApiUrlsConfig.auth.connect,
            body,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );
        UserSecretService.saveToken({access: data.access_token, refresh: data.refresh_token});
    }

    export async function disconnect(): Promise<void> {
        await UserSecretService.destroyToken();
    }

    export async function confirmEmail(token: string): Promise<void> {
        return await http.post(ApiUrlsConfig.auth.confirmEmail(token));
    }
}
