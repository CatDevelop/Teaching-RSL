import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC, PropsWithChildren, useCallback} from "react";
import styles from "./SelectContainer.module.css";
import clsx from "clsx";
import {motion} from "framer-motion"
import {SelectState} from "../../../../../core/models/SelectState";
import {WordFormServer2} from "../../../../../core/models/Word";

export type SelectContainerProps = PropsWithChildren & Readonly<{
    state: SelectState;
    number: number;
    wordObject: WordFormServer2;
    setState: React.Dispatch<React.SetStateAction<any>>;
}>

const stylesByState = {
    success: styles.selectContainer__success,
    checked: styles.selectContainer__selected,
    error: styles.selectContainer__danger,
    disabled: styles.selectContainer__disabled,
    default: ""
}

/**
 * Контейнер для объектов, которые можно выбрать
 */
export const SelectContainer: FC<SelectContainerProps> = typedMemo(function SelectContainer(props) {
    const handleClickOnSelectObject = useCallback(() => {
        if (props.state === "default" || props.state === "checked")
            props.setState(props.state === "checked" ? null : props.wordObject)
    }, [props])

    return (
        <motion.div
            className={clsx(
                styles.selectContainer,
                stylesByState[props.state]
            )}
            onClick={handleClickOnSelectObject}
        >
            {props.children}
            <div className={clsx(styles.selectContainer__number)}>{props.number}</div>
        </motion.div>
    );
});

export const getSelectEntityStatus = (checked: boolean, selectEntity: WordFormServer2 | undefined | null, currentVariant: WordFormServer2 | null, rightVariant: WordFormServer2 | null) => {
    let result: SelectState = "disabled";

    if (!checked) {
        result = selectEntity?.id === currentVariant?.id ? "checked" : "default"
    } else if (currentVariant?.id === selectEntity?.id) {
        result = selectEntity?.id === rightVariant?.id ? "success" : "error"
    }
    return result;
}
