import { CONFIG } from "./config";

/** API ссылки приложения. */
export namespace ApiUrlsConfig {
	const apiUrl = CONFIG.apiUrl;

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

	/** API ссылки обучения. */
	export const learning = {
		getLevelTasks: (levelId: string) => toApi(`level/tasks/${levelId}`)
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
		return new URL(path, `${apiUrl}learning/api/v1/public/`).toString();
	}

	/**
	 * Получить полную API ссылку(sso).
	 * @param path Относительная API ссылка.
	 */
	function toAuthApi(path: string): string {
		return new URL(path, `${apiUrl}sso/`).toString();
	}

	/**
	 * Получить полную API ссылку(lk).
	 * @param path Относительная API ссылка.
	 */
	function toUserApi(path: string): string {
		return new URL(path, `${apiUrl}lk/api/v1/public/`).toString();
	}

	/**
	 * Является ли запрос авторизационным
	 * @param url Ссылка запроса
	 */
	export function isAuthUrl(url: string): boolean {
		return url.includes('sso');
	}
}
