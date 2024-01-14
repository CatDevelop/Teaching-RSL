import {ButtonProps} from "@nextui-org/react";
import {WordFormServer2} from "./Word";

/**
 * Состояние сущности, которую можно выбрать
 */
export type SelectState = Readonly<"default" | "checked" | "success" | "error" | "disabled">

/**
 * Любая сущность, которую можно выбрать (Гиф, слово, изображение...)
 */
export type SelectObjectState = {
    /**
     * Объект слова
     */
    wordObject: Readonly<WordFormServer2>;

    /**
     * Состояние
     */
    state: SelectState;
}

/**
 * Цвета кнопок по состоянию
 */
export const colorsByState: Record<SelectState, ButtonProps['color']> = {
    default: "default",
    checked: "primary",
    success: "success",
    error: "danger",
    disabled: "default"
}
