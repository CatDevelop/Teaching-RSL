import { InternalAxiosRequestConfig } from 'axios';

import { UserSecretService } from '../services/userSecret';
import { ApiUrlsConfig } from '../apiUrlsConfig';

/**
 * Интерсептор для добавления токена авторизации
 * @param config Конфиг запроса
 */
export function addTokenInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
	if (!shouldInterceptWithToken(config)) {
		return config;
	}
	const token = UserSecretService.getToken();
	if (token === null) {
		return config;
	}

	config.headers.set('Authorization', `Bearer ${token.access}`);
	return config;
}

/**
 *Проверить, нужно ли добавлять токен в запрос
 * @param config Конфиг запроса
 *
 */
function shouldInterceptWithToken(config: InternalAxiosRequestConfig): boolean {
	return !ApiUrlsConfig.isAuthUrl(config.url ?? '');
}