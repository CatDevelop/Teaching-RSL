export namespace CookieService {
    /**
         * Сохранить данные в cookieStorage.
         * @param key Ключ.
         * @param value Значение.
         */
    export function set<T>(key: string, value: T, expires?: Date): void {
        document.cookie = `${key}=${value}; expires=${expires?.toUTCString() ?? ''}`;
    }

    /**
     * Получить данные из cookieStorage.
     * @param key Ключ.
     */
    export function get(key: string): string | undefined {
        const value = document.cookie.split(';').find(path => path.split('=')[0].includes(key))?.split('=')[1];
        return value;
    }

    /**
     * Удалить данные из cookieStorage.
     * @param key Ключ.
     */
    export function remove(key: string): void {
        document.cookie = `${key}=; expires=${new Date(0).toUTCString()}`;
    }
}