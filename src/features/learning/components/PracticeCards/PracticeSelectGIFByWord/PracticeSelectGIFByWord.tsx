import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC, useEffect, useState} from "react";
import styles from "./PracticeSelectGIFByWord.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import PracticeIconSVG from "../../../../../assets/images/PracticeIcon.svg"
import {LearningBlock} from "../../LearningBlock";
import {Word, WordFormServer} from "../../../../../core/models/Word";
import {Typography} from "../../../../../components/Typography";
import {SelectGIF} from "../../SelectEntity/SelectGIF";
import {shuffleArray} from "../../../../../core/utils/shuffleArray";
import {StepStatus} from "../../../../../core/models/StepStatus";
import {getSelectEntityStatus} from "../../SelectEntity/SelectContainer/SelectContainer";


type Props = ComponentProps & Readonly<{
    wordObject: WordFormServer;
    otherVariants: (string | null)[];
    checked: boolean;
    setStatus: React.Dispatch<React.SetStateAction<StepStatus>>;
    setIsTaskReadyToCheck: React.Dispatch<React.SetStateAction<boolean>>;
}>


/**
 * Практика "Выбери жест"
 */
export const PracticeSelectGIFByWord: FC<Props> = typedMemo(function PracticeSelectGIFByWord(props) {
    const [selectGIF, setSelectGIF] = useState<string | undefined | null>()
    const [variants] = useState(shuffleArray<(string | null)>([props.wordObject.secondRepresentation, ...props.otherVariants]))

    useEffect(() => {
        if (props.checked) {
            if (selectGIF === props.wordObject.secondRepresentation)
                props.setStatus({status: "success"})
            else
                props.setStatus({
                    status: "error",
                    message: `${variants.findIndex(variant => variant === props.wordObject.secondRepresentation) + 1} картинка`
                })
        }
    }, [props, selectGIF])

    useEffect(() => {
        props.setIsTaskReadyToCheck(!!selectGIF)
    }, [selectGIF, props.setIsTaskReadyToCheck])

    return (
        <div >
            <div className={styles.practiceSelectGif__titleContainer}>
                <Typography variant="h2" className={styles.practiceSelectGif__title}>
                    Выбери жест
                </Typography>
                <Typography
                    variant="h2"
                    className={clsx(styles.practiceSelectGif__title, styles.practiceSelectGif__titleSignText)}
                >
                    {props.wordObject.firstRepresentation}
                </Typography>
            </div>

            <div className={styles.practiceSelectGif__gifsContainer}>
                {
                    variants.map((variant, index) => {
                        console.log(getSelectEntityStatus(props.checked, selectGIF, variant, props.wordObject.secondRepresentation))
                        return <div className={styles.practiceSelectGif__gif}>
                            <SelectGIF
                                key={"SelectGIF" + index}
                                gif={variant || ""}
                                text={variant || ""}
                                state={getSelectEntityStatus(props.checked, selectGIF, variant, props.wordObject.secondRepresentation)}
                                setState={setSelectGIF}
                                number={index + 1}/>
                        </div>
                    })
                }
            </div>
        </div>
    );
});
