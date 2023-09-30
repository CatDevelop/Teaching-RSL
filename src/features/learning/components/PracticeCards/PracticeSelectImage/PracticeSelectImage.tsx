import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./PracticeSelectImage.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import PracticeIconSVG from "../../../../../assets/images/PracticeIcon.svg"
import {LearningBlock} from "../../LearningBlock";
import {Word} from "../../../../../core/models/Word";
import {SignVideo} from "../../../../../components/SignVideo";
import {SelectButton} from "../../SelectEntity/SelectButton";
import {Typography} from "../../../../../components/Typography";
import {SelectImage} from "../../SelectEntity/SelectImage";

type Props = ComponentProps & Readonly<{
    wordObject: Word;
    variants: Word[];
    checked: boolean;
    selectImage?: Word | null;
    setSelectImage: React.Dispatch<React.SetStateAction<Word | null | undefined>>;
}>

/** Практика "Выбери изображение". */
export const PracticeSelectImage: FC<Props> = typedMemo(function PracticeSelectImage(props) {
    return (
        <div className={clsx(styles.practiceSelectImage)}>
            <LearningBlock iconUrl={PracticeIconSVG} title={"Практика"}>
                <div className={styles.practiceSelectImage__contentContainer}>
                    <div className={styles.practiceSelectImage__gifContainer}>
                        <SignVideo src={props.wordObject.gifSource}/>
                    </div>

                    <div className={styles.practiceSelectImage__buttonsContainer}>
                        <Typography variant="h3" className={styles.practiceSelectImage__title}>
                            Выбери правильную картинку
                        </Typography>
                        <div className={styles.practiceSelectImage__imagesContainer}>
                            {
                                props.variants.map((variant, number) => {
                                    return <SelectImage wordObject={variant}
                                                        setState={props.setSelectImage}
                                                        state={!props.checked ? (props.selectImage?.id === variant.id ? "checked" : "default") : variant.id === props.selectImage?.id ? props.selectImage?.id === props.wordObject.id ? "success" : "error" : "disabled"} number={number}/>
                                })
                            }
                        </div>

                    </div>
                </div>
            </LearningBlock>
        </div>
    );
});
