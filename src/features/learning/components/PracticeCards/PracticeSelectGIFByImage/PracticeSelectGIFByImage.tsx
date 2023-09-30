import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./PracticeSelectGIFByImage.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import PracticeIconSVG from "../../../../../assets/images/PracticeIcon.svg"
import {LearningBlock} from "../../LearningBlock";
import {Word} from "../../../../../core/models/Word";
import {SignVideo} from "../../../../../components/SignVideo";
import {SelectButton} from "../../SelectEntity/SelectButton";
import {Typography} from "../../../../../components/Typography";
import {SelectImage} from "../../SelectEntity/SelectImage";
import {SelectGIF} from "../../SelectEntity/SelectGIF";

type Props = ComponentProps & Readonly<{
    wordObject: Word;
    variants: Word[];
    checked: boolean;
    selectGIF?: Word | null;
    setSelectGIF: React.Dispatch<React.SetStateAction<Word | null | undefined>>;
}>

/** Практика "Выбери изображение". */
export const PracticeSelectGIFByImage: FC<Props> = typedMemo(function PracticeSelectGIFByImage(props) {
    return (
        <div className={clsx(styles.practiceSelectGifByImage)}>
            <LearningBlock iconUrl={PracticeIconSVG} title={"Практика"}>
                <div className={styles.practiceSelectGifByImage__contentContainer}>
                    <div className={styles.practiceSelectGifByImage__imageContainer}>
                        <img src={props.wordObject.imageSource}
                             alt="Изображение для жеста"
                        />
                    </div>

                    <div className={styles.practiceSelectGifByImage__buttonsContainer}>
                        <Typography variant="h3" className={styles.practiceSelectGifByImage__title}>
                            Выбери верный жест
                        </Typography>
                        <div className={styles.practiceSelectGifByImage__imagesContainer}>
                            {
                                props.variants.map((variant, number) => {
                                    return <SelectGIF wordObject={variant}
                                                      setState={props.setSelectGIF}
                                                      state={!props.checked ? (props.selectGIF?.id === variant.id ? "checked" : "default") : variant.id === props.selectGIF?.id ? props.selectGIF?.id === props.wordObject.id ? "success" : "error" : "disabled"}
                                                      number={number}/>
                                })
                            }
                        </div>

                    </div>
                </div>
            </LearningBlock>
        </div>
    );
});
