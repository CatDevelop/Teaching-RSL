import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./PracticeSelectWord.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import PracticeIconSVG from "../../../../../assets/images/PracticeIcon.svg"
import {LearningBlock} from "../../LearningBlock";
import {Word} from "../../../../../core/models/Word";
import {SignVideo} from "../../../../../components/SignVideo";
import {SelectButton} from "../../SelectEntity/SelectButton";
import {Typography} from "../../../../../components/Typography";

type Props = ComponentProps & Readonly<{
    wordObject: Word;
    variants: Word[];
    checked: boolean;
    selectWord?: Word | null;
    setSelectWord: React.Dispatch<React.SetStateAction<Word | null | undefined>>;
}>

/** Практика "Выбери слово". */
export const PracticeSelectWord: FC<Props> = typedMemo(function PracticeSelectWord(props) {
    return (
        <div className={clsx(styles.practiceSelectWord)}>
            <LearningBlock iconUrl={PracticeIconSVG} title={"Практика"}>
                <div className={styles.practiceSelectWord__contentContainer}>
                    <div className={styles.practiceSelectWord__gifContainer}>
                        <SignVideo src={props.wordObject.gifSource}/>
                    </div>

                    <div className={styles.practiceSelectWord__buttonsContainer}>
                        <Typography variant="h3" className={styles.practiceSelectWord__title}>
                            Выбери верное слово
                        </Typography>
                        {
                            props.variants.map(variant => {
                                return <SelectButton wordObject={variant}
                                                     setState={props.setSelectWord}
                                                     state={!props.checked ? (props.selectWord?.id === variant.id ? "checked" : "default") : variant.id === props.selectWord?.id ? props.selectWord?.id === props.wordObject.id ? "success" : "error" : "disabled"}/>
                            })
                        }
                    </div>
                </div>
            </LearningBlock>
        </div>
    );
});
