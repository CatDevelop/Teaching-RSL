/**
 * Запрос на смену имени
 */
export type ChangeNameRequestDto = Readonly<{
    /**
     * Имя
     */
    firstName: string;

    /**
     * Фамилия
     */
    lastName: string;
}>
