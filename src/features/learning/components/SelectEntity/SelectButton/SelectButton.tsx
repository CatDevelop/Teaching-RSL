import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC} from "react";
import {Button} from "../../../../../components/Button";
import styles from "./SelectButton.module.css";
import clsx from "clsx";
import {Word} from "../../../../../core/models/Word";
import {SelectState} from "../../../../../core/models/SelectState";

type Props = Readonly<{
    state: SelectState;

    wordObject: Word;
    setState: React.Dispatch<React.SetStateAction<any>>;
}>

/** Кнопка, которую можно выбрать. */
export const SelectButton: FC<Props> = typedMemo(function SelectButton(props) {
    const colorsByState = {
        "default": "default",
        "checked": "primary",
        "success": "success",
        "error": "danger",
        "disabled": "default"
    }

    return (
        <Button variant={"bordered"}
            // @ts-ignore
                color={colorsByState[props.state]}
                size={"lg"}
                disabled={props.state === "error" || props.state === "success" || props.state === "disabled"}
                className={clsx(styles.selectButton, props.state === "disabled" && styles.selectButton__disabled)}
                onClick={props.state === "checked" ?
                    () => props.setState(null) :
                    () => props.setState(props.wordObject)
                }
        >
            {props.wordObject.text}
        </Button>
    );
});
