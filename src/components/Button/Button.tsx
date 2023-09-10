import React, {FC} from "react";
import { clsx } from 'clsx';
import { Button as ButtonNextUI, ButtonProps } from "@nextui-org/react";
import { typedMemo } from "../../core/utils/typedMemo";
import styles from "./Button.module.css";

type Props = ButtonProps;

/** Button. */
export const Button: FC<Props> = typedMemo(function Buttont(props){
    return <ButtonNextUI {...props} 
                className={clsx(styles.button, props.variant === "faded" && styles.button_faded)}/>;
})
