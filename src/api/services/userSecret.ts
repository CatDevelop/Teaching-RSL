import { UserSecret } from 'core/models/auth/UserSecret';
import { LocalStorageService } from './localStorageService';

export namespace UserSecretService {

	const SECRET_KEY = 'Teaching-RSL-SECRET';

	/** Get user secret from local storage. */
	export function hasToken(): boolean {
		return LocalStorageService.get<UserSecret>(SECRET_KEY) !== null;
	}

	/** Get user secret from local storage. */
	export function getToken(): UserSecret | null {
		return LocalStorageService.get<UserSecret>(SECRET_KEY);
	}

	/**
	 * Save user secret to local storage.
	 * @param token Token received from server.
	 */
	export function saveToken(token: UserSecret): void {
		return LocalStorageService.set(SECRET_KEY, token);
	}

	/** Destroy user secret from local storage. */
	export function destroyToken(): void {
		return LocalStorageService.remove(SECRET_KEY);
	}
}
