import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC, useState} from "react";
import styles from "./PracticeSelectGIFByImage.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import PracticeIconSVG from "../../../../../assets/images/PracticeIcon.svg"
import {LearningBlock} from "../../LearningBlock";
import {Word} from "../../../../../core/models/Word";
import {Typography} from "../../../../../components/Typography";
import {SelectGIF} from "../../SelectEntity/SelectGIF";
import {getSelectEntityStatus} from "../../SelectEntity/SelectContainer/SelectContainer";
import {StepStatus} from "../../../../../core/models/StepStatus";
import {shuffleArray} from "../../../../../core/utils/shuffleArray";

type Props = ComponentProps & Readonly<{
    wordObject: Word;
    otherVariants: Word[];
    checked: boolean;
    setStatus: React.Dispatch<React.SetStateAction<StepStatus>>;
    setIsTaskReadyToCheck: React.Dispatch<React.SetStateAction<boolean>>;
}>

/** Практика "Выбери изображение". */
export const PracticeSelectGIFByImage: FC<Props> = typedMemo(function PracticeSelectGIFByImage(props) {
    const [selectGIF, setSelectGIF] = useState<Word | null>()
    const [variants] = useState(shuffleArray([props.wordObject, ...props.otherVariants]))

    return (
        <div className={clsx(styles.practiceSelectGifByImage)}>
            <LearningBlock iconUrl={PracticeIconSVG} title={"Практика"}>
                <div className={styles.practiceSelectGifByImage__contentContainer}>
                    <div className={styles.practiceSelectGifByImage__imageContainer}>
                        <img src={props.wordObject.imageSource} alt="Изображение для жеста"/>
                    </div>

                    <div className={styles.practiceSelectGifByImage__buttonsContainer}>
                        <Typography variant="h3" className={styles.practiceSelectGifByImage__title}>
                            Выбери верный жест
                        </Typography>
                        <div className={styles.practiceSelectGifByImage__imagesContainer}>
                            {
                                variants.map((variant, index) => {
                                    return (
                                        <SelectGIF
                                            wordObject={variant}
                                            setState={setSelectGIF}
                                            state={getSelectEntityStatus(props.checked, selectGIF, variant, props.wordObject)}
                                            number={index}
                                        />
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            </LearningBlock>
        </div>
    );
});
