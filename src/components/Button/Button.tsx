import React, {FC} from "react";
import { clsx } from 'clsx';
import { Button as ButtonNextUI, ButtonProps } from "@nextui-org/react";
import { typedMemo } from "../../core/utils/typedMemo";
import styles from "./Button.module.css";

type Props = ButtonProps;

/** Кнопка. */
export const Button: FC<Props> = typedMemo(function Button(props){
    return <ButtonNextUI
                {...props}
                className={clsx(
                    styles.button,
                    props.variant === "faded" && props.color !== "primary" && styles.button__faded,
                    props.variant === "faded" && props.color === "primary" && styles.button__primary__faded,
                    props.variant === "light" && styles.button__link,
                    props.variant === undefined && styles.button__filled,
                    props.className
                )}
            />;
})
