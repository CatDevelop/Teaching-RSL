import React, {FC} from "react";
import { Button as ButtonNextUI, ButtonProps } from "@nextui-org/react";
import { typedMemo } from "../../core/utils/typedMemo";
import { clsx } from 'clsx';
import styles from "./Button.module.css";

type Props = ButtonProps;

export const Button: FC<Props> = typedMemo(function Buttont(props){
    return <ButtonNextUI {...props} 
                className={clsx(styles.button, props.variant === "faded" && styles.button_faded)}/>;
})
