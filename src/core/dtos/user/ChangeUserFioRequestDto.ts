export type ChangeUserFioRequestDto = {
    /**
     * Новое имя
     */
    firstName: string | null;

    /**
     * Новая фамилия
     */
    lastName: string | null;
}