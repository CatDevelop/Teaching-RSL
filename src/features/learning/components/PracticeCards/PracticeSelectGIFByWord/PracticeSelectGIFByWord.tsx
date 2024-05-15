import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC, useEffect, useState} from "react";
import styles from "./PracticeSelectGIFByWord.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import {WordFormServer2} from "../../../../../core/models/Word";
import {Typography} from "../../../../../components/Typography";
import {SelectGIF} from "../../SelectEntity/SelectGIF";
import {shuffleArray} from "../../../../../core/utils/shuffleArray";
import {StepStatus} from "../../../../../core/models/StepStatus";
import {getSelectEntityStatus} from "../../SelectEntity/SelectContainer/SelectContainer";


type Props = ComponentProps & Readonly<{
    wordObject: WordFormServer2;
    otherVariants: WordFormServer2[];
    checked: boolean;
    setStatus: React.Dispatch<React.SetStateAction<StepStatus>>;
    setIsTaskReadyToCheck: React.Dispatch<React.SetStateAction<boolean>>;
}>


/**
 * Практика "Выбери жест"
 */
export const PracticeSelectGIFByWord: FC<Props> = typedMemo(function PracticeSelectGIFByWord(props) {
    const [selectGIF, setSelectGIF] = useState<WordFormServer2>()
    const [variants] = useState(shuffleArray<WordFormServer2>([props.wordObject, ...props.otherVariants]))

    useEffect(() => {
        if (props.checked) {
            if (selectGIF?.id === props.wordObject.id)
                props.setStatus({status: "success"})
            else
                props.setStatus({
                    status: "error",
                    message: `${variants.findIndex(variant => variant?.id === props.wordObject.id) + 1} картинка`
                })
        }
    }, [props, selectGIF])

    useEffect(() => {
        props.setIsTaskReadyToCheck(!!selectGIF)
    }, [selectGIF, props.setIsTaskReadyToCheck])

    return (
        <div className={styles.practiceSelectGif}>
            <div className={styles.practiceSelectGif__titleContainer}>
                <Typography variant="h2" className={styles.practiceSelectGif__title}>
                    Choose the
                </Typography>
                <Typography
                    variant="h2"
                    className={clsx(styles.practiceSelectGif__title, styles.practiceSelectGif__titleSignText)}
                >
                    {props.wordObject.word}
                </Typography>
                <Typography variant="h2" className={styles.practiceSelectGif__title}>
                    sign
                </Typography>
            </div>

            <div className={styles.practiceSelectGif__gifsContainer}>
                {
                    variants.map((variant, index) => {
                        return <div className={styles.practiceSelectGif__gif}>
                            <SelectGIF
                                key={"SelectGIF" + index}
                                wordObject={variant}
                                state={getSelectEntityStatus(props.checked, selectGIF, variant, props.wordObject)}
                                setState={setSelectGIF}
                                number={index + 1}/>
                        </div>
                    })
                }
            </div>
        </div>
    );
});
