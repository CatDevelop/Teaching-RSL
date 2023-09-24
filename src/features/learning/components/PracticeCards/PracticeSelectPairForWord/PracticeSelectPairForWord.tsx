import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./PracticeSelectPairForWord.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import PracticeIconSVG from "../../../../../assets/images/PracticeIcon.svg"
import {LearningBlock} from "../../LearningBlock";
import {Word} from "../../../../../core/models/Word";
import {Typography} from "../../../../../components/Typography";
import {shuffleArray} from "../../../../../core/utils/shuffleArray";
import {SelectButton} from "../../SelectEntity/SelectButton";

type Props = ComponentProps & Readonly<{
    variants: Word[];
}>

/** Практика "Подбери пару к словам". */
export const PracticeSelectPairForWord: FC<Props> = typedMemo(function PracticeSelectPairForWord(props) {
    const shuffleWords = shuffleArray(props.variants);

    return (
        <div className={clsx(styles.practiceSelectPairForWord)}>
            <LearningBlock iconUrl={PracticeIconSVG} title={"Практика"}>
                <div className={styles.practiceSelectPairForWord__contentContainer}>
                    <Typography variant="h3" className={styles.practiceSelectPairForWord__title}>
                        Подбери пару к словам
                    </Typography>

                    <div className={styles.practiceSelectPairForWord__taskContainer}>
                        {/*{*/}
                        {/*    shuffleWords.map(wordObject => {*/}
                        {/*        return <SelectButton checked={true} wordObject={wordObject} setState={}/>*/}
                        {/*    })*/}
                        {/*}*/}
                    </div>

                </div>
            </LearningBlock>
        </div>
    );
});
