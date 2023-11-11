import { CONFIG } from "./config";

/** API ссылки приложения. */
export namespace ApiUrlsConfig {
	const apiUrl = CONFIG.apiUrl;
	const apiAuthUrl = CONFIG.apiAuthUrl;

	/** API ссылки авторизации. */
	export const auth = {
		register: toAuthApi('register'),
	};

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
	 * Получить полную API ссылку авторизации.
	 * @param path Относительная API ссылка.
	 */
	function toAuthApi(path: string): string {
		return new URL(path, apiAuthUrl).toString();
	}
}
