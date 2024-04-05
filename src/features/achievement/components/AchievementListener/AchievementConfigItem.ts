import {ReactElement} from "react";

/**
 * Элемент настроек достижений
 */
export type AchievementConfigItem = {
    /**
     * Название достижения
     */
    name: string;

    /**
     * Описание достижения
     */
    description: string;

    /**
     * Иконка достижения
     */
    image: ReactElement;

    /**
     * Класс всплывающей подсказки
     */
    toastClassName?: string;
}
