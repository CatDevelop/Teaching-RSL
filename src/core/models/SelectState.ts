import {ButtonProps} from "@nextui-org/react";

export type SelectState = Readonly<"default" | "checked" | "success" | "error" | "disabled">

export const colorsByState: Record<SelectState, ButtonProps['color']> = {
    default: "default",
    checked: "primary",
    success: "success",
    error: "danger",
    disabled: "default"
}
