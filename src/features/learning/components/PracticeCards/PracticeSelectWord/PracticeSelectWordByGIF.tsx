import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC, useEffect, useState} from "react";
import styles from "./PracticeSelectWord.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import PracticeIconSVG from "../../../../../assets/images/PracticeIcon.svg"
import {LearningBlock} from "../../LearningBlock";
import {WordFormServer2} from "../../../../../core/models/Word";
import {SignVideo} from "../../../../../components/SignVideo";
import {SelectButton} from "../../SelectEntity/SelectButton";
import {StepStatus} from "../../../../../core/models/StepStatus";
import {shuffleArray} from "../../../../../core/utils/shuffleArray";
import {getSelectEntityStatus} from "../../SelectEntity/SelectContainer/SelectContainer";

type Props = ComponentProps & Readonly<{
    rightSelect: WordFormServer2;
    otherSelects: WordFormServer2[];

    checked: boolean;
    setStatus: React.Dispatch<React.SetStateAction<StepStatus>>;
    setIsTaskReadyToCheck: React.Dispatch<React.SetStateAction<boolean>>;
}>

/**
 * Практика "Выбери слово"
 */
export const PracticeSelectWordByGIF: FC<Props> = typedMemo(function PracticeSelectWordByGIF(props) {
    const [allVariants, setAllVariants] = useState<WordFormServer2[]>(
        shuffleArray<WordFormServer2>([props.rightSelect, ...props.otherSelects])
    )
    const [currentSelect, setCurrentSelect] = useState<WordFormServer2 | null>()

    useEffect(() => {
        setAllVariants(shuffleArray<WordFormServer2>([props.rightSelect, ...props.otherSelects]))
    }, [props.rightSelect, props.otherSelects]);

    useEffect(() => {
        setCurrentSelect(null)
        props.setIsTaskReadyToCheck(false)
        props.setStatus({status: "default"})
    }, [allVariants]);

    useEffect(() => {
        if (props.checked) {
            if (currentSelect?.id === props.rightSelect.id)
                props.setStatus({status: "success"})
            else
                props.setStatus({status: "error", message: props.rightSelect.word || ""})
        }
    }, [props, currentSelect])

    useEffect(() => {
        props.setIsTaskReadyToCheck(!!currentSelect)
    }, [currentSelect, props.setIsTaskReadyToCheck]) 

    return (
        <div className={clsx(styles.practiceSelectWord)}>
            <LearningBlock title={"Выберите верное слово"}>
                <div className={styles.practiceSelectWord__contentContainer}>
                    <SignVideo src={props.rightSelect.illustrations[0].path} className={styles.practiceSelectWord__signVideo}/>

                    <div className={styles.practiceSelectWord__buttonsContainer}>
                        {
                            allVariants?.map(variant => (
                                <SelectButton
                                    wordObject={variant}
                                    setState={setCurrentSelect}
                                    state={getSelectEntityStatus(props.checked, currentSelect, variant, props.rightSelect)}
                                />
                            ))
                        }
                    </div>
                </div>
            </LearningBlock>
        </div>
    );
});
