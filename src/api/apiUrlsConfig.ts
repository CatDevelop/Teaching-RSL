import { CONFIG } from "./config";

/** API ссылки приложения. */
export namespace ApiUrlsConfig {
	const apiUrl = CONFIG.apiUrl;

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
}
