import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC, useEffect, useState} from "react";
import styles from "./PracticeSelectImage.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import PracticeIconSVG from "../../../../../assets/images/PracticeIcon.svg"
import {LearningBlock} from "../../LearningBlock";
import {Word} from "../../../../../core/models/Word";
import {SignVideo} from "../../../../../components/SignVideo";
import {Typography} from "../../../../../components/Typography";
import {SelectImage} from "../../SelectEntity/SelectImage";
import {StepStatus} from "../../../../../core/models/StepStatus";
import {shuffleArray} from "../../../../../core/utils/shuffleArray";
import {getSelectEntity} from "../../SelectEntity/SelectContainer/SelectContainer";

type Props = ComponentProps & Readonly<{
    wordObject: Word;
    otherVariants: Word[];
    checked: boolean;
    setStatus: React.Dispatch<React.SetStateAction<StepStatus>>;
    setIsTaskReadyToCheck: React.Dispatch<React.SetStateAction<boolean>>;
}>

/** Практика "Выбери изображение". */
export const PracticeSelectImage: FC<Props> = typedMemo(function PracticeSelectImage(props) {
    const [selectImage, setSelectImage] = useState<Word | null>()
    const [variants] = useState(shuffleArray([props.wordObject, ...props.otherVariants]))

    useEffect(() => {
        if (props.checked) {
            if (selectImage?.id === props.wordObject.id)
                props.setStatus({status: "success"})
            else
                props.setStatus({status: "error", message: props.wordObject.text})
        }
    }, [props, selectImage?.id])

    useEffect(() => {
        props.setIsTaskReadyToCheck(!!selectImage)
    }, [selectImage, props.setIsTaskReadyToCheck])

    return (
        <div className={clsx(styles.practiceSelectImage)}>
            <LearningBlock iconUrl={PracticeIconSVG} title={"Практика"}>
                <div className={styles.practiceSelectImage__contentContainer}>
                    <div className={styles.practiceSelectImage__gifContainer}>
                        <SignVideo src={props.wordObject.gifSource}/>
                    </div>

                    {/*<div className={styles.practiceSelectImage__buttonsContainer}>*/}
                    <Typography variant="h3" className={styles.practiceSelectImage__title}>
                        Выбери правильную картинку
                    </Typography>
                    <div className={styles.practiceSelectImage__imagesContainer}>
                        {
                            variants.map((variant, index) => {
                                return (
                                    <div className={styles.practiceSelectImage__imageContainer}>
                                        <SelectImage wordObject={variant}
                                                     setState={setSelectImage}
                                                     state={getSelectEntity(props.checked, selectImage, variant, props.wordObject)}
                                                     number={index + 1}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/*</div>*/}
                </div>
            </LearningBlock>
        </div>
    );
});
