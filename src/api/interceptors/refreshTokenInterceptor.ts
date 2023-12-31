import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiUrlsConfig } from '../apiUrlsConfig';
import { UserSecretService } from 'api/services/userSecret';
import { AuthService } from 'api/services/auth';

export type RefreshResult = Promise<AxiosResponse<unknown, unknown>>;

/**
 * Интерсептор обновления токена
 * @param error Ошибка запроса
 * @param refreshCallback Коллбек для повтора запроса
 */
export function refreshSecretInterceptor(error: AxiosError)/*: RefreshResult*/ {
	if (
		error.config == null ||
		!shouldRefreshSecretForUrl(error.config) ||
		(error.response != null && error.response.status !== 401)
	) {
		throw error;
	}

	return refreshSecret(error);
}

const refreshSecret = async(requestError: AxiosError)/*RefreshResult*/ => {
	const secret = UserSecretService.getToken();
	if (secret === null || requestError.config === undefined) {
		throw requestError;
	}

	try {
        // TODO refresh 
		/*const newSecret = await AuthService.refreshSecret(secret);
		UserSecretService.saveToken(newSecret);
		return http.request(requestError.config);*/
	} catch (error: unknown) {
		AuthService.disconnect();
		throw error;
	}
};

/**
 * Проверка запроса на необходимость токена авторизации.
 * @param config Request config.
 */
export function shouldRefreshSecretForUrl(config: AxiosRequestConfig): boolean {
	if (config.url === undefined) {
		return false;
	}

	return !ApiUrlsConfig.isAuthUrl(config.url);
}