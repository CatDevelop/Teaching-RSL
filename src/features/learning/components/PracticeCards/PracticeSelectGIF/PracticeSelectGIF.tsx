import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./PracticeSelectGIF.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import PracticeIconSVG from "../../../../../assets/images/PracticeIcon.svg"
import {LearningBlock} from "../../LearningBlock";
import {Word} from "../../../../../core/models/Word";
import {Typography} from "../../../../../components/Typography";
import {SelectGIF} from "../../SelectEntity/SelectGIF";

type Props = ComponentProps & Readonly<{
    wordObject: Word;
    variants: Word[];

    checked: boolean;
    selectGIF?: Word | null;
    setSelectGIF: React.Dispatch<React.SetStateAction<Word | null | undefined>>;
}>

/** Практика "Выбери жест". */
export const PracticeSelectGIF: FC<Props> = typedMemo(function PracticeSelectGIF(props) {
    return (
        <div className={clsx(styles.practiceSelectGif)}>
            <LearningBlock iconUrl={PracticeIconSVG} title={"Практика"}>
                <div className={styles.practiceSelectGif__contentContainer}>
                    <div className={styles.practiceSelectGif__titleContainer}>
                        <Typography variant="h3" className={styles.practiceSelectGif__title}>
                            Выбери жест
                        </Typography>
                        <Typography variant="h3"
                                    className={clsx(styles.practiceSelectGif__title, styles.practiceSelectGif__titleSignText)}>
                            {props.wordObject.text}
                        </Typography>
                    </div>

                    <div className={styles.practiceSelectGif__gifsContainer}>
                        {
                            props.variants.map((variant, i) => {
                                return <SelectGIF wordObject={variant}
                                                  state={!props.checked ? (props.selectGIF?.id === variant.id ? "checked" : "default") : variant.id === props.selectGIF?.id ? props.selectGIF?.id === props.wordObject.id ? "success" : "error" : "disabled"}
                                                  setState={props.setSelectGIF}
                                                  number={i + 1}/>
                            })
                        }
                    </div>
                </div>
            </LearningBlock>
        </div>
    );
});
