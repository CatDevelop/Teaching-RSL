import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./SelectGIF.module.css";
import clsx from "clsx";
import {Word} from "../../../../core/models/Word";
import {SignVideo} from "../../../../components/SignVideo";
import {motion} from "framer-motion"

type Props = Readonly<{
    checked: boolean;
    success?: boolean;
    number: number;

    wordObject: Word;
    setState: React.Dispatch<React.SetStateAction<Word | null>>;
}>

/** GIF, которое можно выбрать. */
export const SelectGIF: FC<Props> = typedMemo(function SelectGIF(props) {
    return (
        <motion.div
            className={clsx(styles.selectGIF, props.success && styles.selectGIF__success, props.checked && styles.selectGIF__selected)}
            onClick={props.success ? undefined :
                () => props.setState(props.checked ? null : props.wordObject)
            }
        >
            <SignVideo src={props.wordObject.gifSource}/>
            <div className={clsx(styles.selectGIF__number)}>
                {props.number}
            </div>
        </motion.div>

    );
});
