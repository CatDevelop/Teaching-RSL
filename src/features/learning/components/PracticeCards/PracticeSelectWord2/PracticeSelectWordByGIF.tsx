import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC, useEffect, useState} from "react";
import styles from "./PracticeSelectWord.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import PracticeIconSVG from "../../../../../assets/images/PracticeIcon.svg"
import {LearningBlock} from "../../LearningBlock";
import {WordFormServer} from "../../../../../core/models/Word";
import {SignVideo} from "../../../../../components/SignVideo";
import {SelectButton} from "../../SelectEntity/SelectButton";
import {StepStatus} from "../../../../../core/models/StepStatus";
import {shuffleArray} from "../../../../../core/utils/shuffleArray";
import {getSelectEntityStatus} from "../../SelectEntity/SelectContainer/SelectContainer";

type Props = ComponentProps & Readonly<{
    rightSelect: WordFormServer;
    otherSelects: (string | null)[];

    checked: boolean;
    setStatus: React.Dispatch<React.SetStateAction<StepStatus>>;
    setIsTaskReadyToCheck: React.Dispatch<React.SetStateAction<boolean>>;
}>

/**
 * Практика "Выбери слово"
 */
export const PracticeSelectWordByGIF: FC<Props> = typedMemo(function PracticeSelectWordByGIF(props) {
    const [allVariants] = useState<(string | null)[]>(
        shuffleArray<(string | null)>([props.rightSelect.firstRepresentation, ...props.otherSelects])
    )
    const [currentSelect, setCurrentSelect] = useState<string | null>()


    useEffect(() => {
        if (props.checked) {
            if (currentSelect === props.rightSelect.firstRepresentation)
                props.setStatus({status: "success"})
            else
                props.setStatus({status: "error", message: props.rightSelect.firstRepresentation || ""})
        }
    }, [props, currentSelect])

    useEffect(() => {
        props.setIsTaskReadyToCheck(!!currentSelect)
    }, [currentSelect, props.setIsTaskReadyToCheck])

    return (
        <div className={clsx(styles.practiceSelectWord)}>
            <LearningBlock iconUrl={PracticeIconSVG} title={"Выберите верное слово"}>
                <div className={styles.practiceSelectWord__contentContainer}>
                    <SignVideo src={props.rightSelect.secondRepresentation} className={styles.practiceSelectWord__signVideo}/>

                    <div className={styles.practiceSelectWord__buttonsContainer}>
                        {/*<Typography variant="h3" className={styles.practiceSelectWord__title}>*/}
                        {/*    Выбери верное слово*/}
                        {/*</Typography>*/}
                        {
                            allVariants?.map(variant => (
                                <SelectButton
                                    text={variant}
                                    setState={setCurrentSelect}
                                    state={getSelectEntityStatus(props.checked, currentSelect, variant, props.rightSelect.firstRepresentation)}
                                />
                            ))
                        }
                    </div>
                </div>
            </LearningBlock>
        </div>
    );
});
