import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC, PropsWithChildren, useCallback} from "react";
import styles from "./SelectContainer.module.css";
import clsx from "clsx";
import {motion} from "framer-motion"
import {SelectState} from "../../../../../core/models/SelectState";

export type SelectContainerProps = PropsWithChildren & Readonly<{
    state: SelectState;
    number: number;

    gif?:string;
    text: string;
    setState: React.Dispatch<React.SetStateAction<any>>;
}>

/**
 * Контейнер для объектов, которые можно выбрать
 */
export const SelectContainer: FC<SelectContainerProps> = typedMemo(function SelectContainer(props) {
    const handleClickOnSelectObject = useCallback(() => {
        if (props.state === "default" || props.state === "checked")
            props.setState(props.state === "checked" ? null : props.text)
    }, [props])

    return (
        <motion.div
            className={clsx(
                styles.selectContainer,
                props.state === "success" && styles.selectContainer__success,
                props.state === "checked" && styles.selectContainer__selected,
                props.state === "error" && styles.selectContainer__danger,
                props.state === "disabled" && styles.selectContainer__disabled,
            )}
            onClick={handleClickOnSelectObject}
        >
            {props.children}
            <div className={clsx(styles.selectContainer__number)}>{props.number}</div>
        </motion.div>
    );
});

export const getSelectEntityStatus = (checked: boolean, selectEntity: string | undefined | null, currentVariant: string | null, rightVariant: string | null) => {
    let result: SelectState = "disabled";
    if (!checked) {
        result = selectEntity === currentVariant ? "checked" : "default"
    } else if (currentVariant === selectEntity) {
        result = selectEntity === rightVariant ? "success" : "error"
    }
    return result;
}
