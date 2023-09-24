import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC, PropsWithChildren} from "react";
import styles from "./SelectContainer.module.css";
import clsx from "clsx";
import {Word} from "../../../../../core/models/Word";
import {motion} from "framer-motion"
import {SelectState} from "../../../../../core/models/SelectState";

export type SelectContainerProps = PropsWithChildren & Readonly<{
    state: SelectState;
    number: number;

    wordObject: Word;
    setState: React.Dispatch<React.SetStateAction<Word | null | undefined>>;
}>

/** Контейнер для объектов, которые можно выбрать. */
export const SelectContainer: FC<SelectContainerProps> = typedMemo(function SelectContainer(props) {
    return (
        <motion.div
            className={clsx(
                styles.selectContainer,
                props.state === "success" && styles.selectContainer__success,
                props.state === "checked" && styles.selectContainer__selected,
                props.state === "error" && styles.selectContainer__danger,
                props.state === "disabled" && styles.selectContainer__disabled,
            )}
            onClick={
                (props.state !== "default" && props.state !== "checked") ?
                    undefined :
                    () => props.setState(props.state === "checked" ? null : props.wordObject)
            }
        >
            {props.children}
            <div className={clsx(styles.selectContainer__number)}>{props.number}</div>
        </motion.div>
    );
});
