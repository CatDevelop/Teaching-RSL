import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, PropsWithChildren} from "react";
import styles from "./SelectContainer.module.css";
import clsx from "clsx";
import {Word} from "../../../../core/models/Word";
import {motion} from "framer-motion"

export type SelectContainerProps = PropsWithChildren & Readonly<{
    checked: boolean;
    success?: boolean;
    number: number;

    wordObject: Word;
    setState: React.Dispatch<React.SetStateAction<Word | null>>;
}>

/** Контейнер для объектов, которые можно выбрать. */
export const SelectContainer: FC<SelectContainerProps> = typedMemo(function SelectContainer(props) {
    return (
        <motion.div
            className={clsx(styles.selectContainer, props.success && styles.selectContainer__success, props.checked && styles.selectContainer__selected)}
            onClick={
                props.success ?
                    undefined :
                    () => props.setState(props.checked ? null : props.wordObject)
            }
        >
            {props.children}
            <div className={clsx(styles.selectContainer__number)}>{props.number}</div>
        </motion.div>
    );
});
