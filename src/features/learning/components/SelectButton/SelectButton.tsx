import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC} from "react";
import {Button} from "../../../../components/Button";
import styles from "./SelectButton.module.css";
import clsx from "clsx";
import {Word} from "../../../../core/models/Word";

type Props = Readonly<{
    checked: boolean;
    success?: boolean;

    wordObject: Word;
    setState: React.Dispatch<React.SetStateAction<any>>;
}>

/** Кнопка, которую можно выбрать. */
export const SelectButton: FC<Props> = typedMemo(function SelectButton(props) {
    return (
        <Button variant={"bordered"}
                color={props.success ? "success" : (props.checked ? "primary" : "default")}
                size={"lg"}
                disabled={props.success}
                className={clsx(styles.selectButton)}
                onClick={props.checked ?
                    () => props.setState(null) :
                    () => props.setState(props.wordObject)
                }
        >
            {props.wordObject.text}
        </Button>
    );
});
