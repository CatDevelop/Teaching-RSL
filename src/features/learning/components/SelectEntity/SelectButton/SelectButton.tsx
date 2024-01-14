import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC} from "react";
import {Button} from "../../../../../components/Button";
import styles from "./SelectButton.module.css";
import clsx from "clsx";
import {colorsByState, SelectState} from "../../../../../core/models/SelectState";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import {WordFormServer2} from "../../../../../core/models/Word";

type Props = ComponentProps & Readonly<{
    state: SelectState;
    wordObject: WordFormServer2;
    setState: React.Dispatch<React.SetStateAction<any>>;
}>

/**
 * Кнопка, которую можно выбрать
 */
export const SelectButton: FC<Props> = typedMemo(function SelectButton(props) {
    const handleClick = () => {
        props.setState(props.state === "checked" ? null : props.wordObject)
    }

    return (
        <Button
            variant={"bordered"}
            color={colorsByState[props.state]}
            size={"lg"}
            disabled={props.state !== "default" && props.state !== "checked"}
            className={clsx(styles.selectButton, props.state === "disabled" && styles.selectButton__disabled)}
            onClick={handleClick}
        >
            {props.wordObject.word}
        </Button>
    );
});
