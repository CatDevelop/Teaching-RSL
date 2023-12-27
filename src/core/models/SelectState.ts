import {ButtonProps} from "@nextui-org/react";
import {WordFormServer} from "./Word";

export type SelectState = Readonly<"default" | "checked" | "success" | "error" | "disabled">

export type SelectObjectState = {
    wordObject: Readonly<WordFormServer>;
    state: SelectState;
}

export const colorsByState: Record<SelectState, ButtonProps['color']> = {
    default: "default",
    checked: "primary",
    success: "success",
    error: "danger",
    disabled: "default"
}
