import React, { FC } from "react";
import { Input as InputNextUI, InputProps } from "@nextui-org/react";
import clsx from "clsx";
import { typedMemo } from "../../core/utils/typedMemo";
import styles from "./Input.module.css";

export const Input: FC<InputProps> = typedMemo(function Input(props){
    return <InputNextUI 
        {...props} 
        variant="faded"
        classNames={{
            inputWrapper: [styles.input__inputWrapper],
            label: [styles.input__label]
        }}
        className={clsx(styles.input, styles.className)}
    />
})
