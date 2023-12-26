import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC} from "react";
import {Button} from "../../../../../components/Button";
import styles from "./SelectButton.module.css";
import clsx from "clsx";
import {colorsByState, SelectState} from "../../../../../core/models/SelectState";
import {ComponentProps} from "../../../../../core/models/ComponentProps";

type Props = ComponentProps & Readonly<{
    state: SelectState;
    text: string | null;
    setState: React.Dispatch<React.SetStateAction<any>>;
}>

/**
 * Кнопка, которую можно выбрать
 */
export const SelectButton: FC<Props> = typedMemo(function SelectButton(props) {
    const handleClick = () => {
        props.setState(props.state === "checked" ? null : props.text)
    }

    return (
        <Button
            variant={"bordered"}
            color={colorsByState[props.state]}
            size={"lg"}
            disabled={props.state === "error" || props.state === "success" || props.state === "disabled"}
            className={clsx(styles.selectButton, props.state === "disabled" && styles.selectButton__disabled)}
            onClick={handleClick}
        >
            {props.text}
        </Button>
    );
});
