import React, { FC, forwardRef } from "react";
import { Input as InputNextUI, InputProps } from "@nextui-org/react";
import { typedMemo } from "../../core/utils/typedMemo";
import styles from "./Input.module.css";

/**
 * Поле ввода
 */
export const Input: FC<InputProps> = typedMemo(forwardRef(function Input(props, ref){
    return <InputNextUI
        {...props}
        variant="faded"
        ref={ref}
        classNames={{inputWrapper: [styles.input__inputWrapper], input: [styles.input]}}
    />
}))
