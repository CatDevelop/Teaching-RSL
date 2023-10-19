import React, { FC, forwardRef } from "react";
import { Input as InputNextUI, InputProps } from "@nextui-org/react";
import clsx from "clsx";
import { typedMemo } from "../../core/utils/typedMemo";
import styles from "./Input.module.css";

export const Input: FC<InputProps> = typedMemo(forwardRef(function Input(props, ref){
    return <InputNextUI 
        {...props} 
        variant="faded"
        ref={ref}
        classNames={{
            inputWrapper: [styles.input__inputWrapper],
            label: [styles.input__label]
        }}
        className={clsx(styles.input, styles.className)}
    />
}))
