import { CONFIG } from "./config";

/** API ссылки приложения. */
export namespace ApiUrlsConfig {
	const apiUrl = CONFIG.apiUrl;
	const apiUserUrl = CONFIG.apiUserUrl;
	const apiAuthUrl = CONFIG.apiAuthUrl;

	/** API ссылки пользователя. */
	export const user = {
		register: toUserApi('user/register'),
	}

	/** API ссылки авторизации (sso) */
	export const auth = {
		connect: toAuthApi('connect/token')
	}

	/** API ссылки тем. */
	export const themes = {
		getList: toApi('themes/list'),
		getListWithUnits: () => toApi('themes/list/with-units'),
	};

	/** API ссылки разделов. */
	export const unit = {
		getList: toApi('unit/list'),
		getListWithLevels: () => toApi('unit/list/with-levels'),
	};

	/** API ссылки тренировок. */
	export const training = {
		postTestCreate: toApi('training'),
		getTest: (id: string) => toApi(`training/${id}`)
	};

	/**
	 * Получить полную API ссылку.
	 * @param path Относительная API ссылка.
	 */
	function toApi(path: string): string {
		return new URL(path, apiUrl).toString();
	}

	/**
	 * Получить полную API ссылку пользователя.
	 * @param path Относительная API ссылка.
	 */
	function toUserApi(path: string): string {
		return new URL(path, apiUserUrl).toString();
	}

	/**
	 * Получить полную API ссылку авторизации (sso).
	 * @param path Относительная API ссылка.
	 */
	function toAuthApi(path: string): string {
		return new URL(path, apiAuthUrl).toString();
	}

	/**
	 * Является ли запрос авторизационным
	 * @param url Ссылка запроса
	 */
	export function isAuthUrl(url: string): boolean {
		return url.includes(apiAuthUrl);
	}
}
