import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./TheoryCard.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import TheoryIconSVG from "../../../../assets/images/TheoryIcon.svg"
import {Typography} from "../../../../components/Typography";
import {SignVideo} from "../../../../components/SignVideo";
import {LearningBlock} from "../LearningBlock";
import {Word, WordFormServer2} from "../../../../core/models/Word";
import {IllustrationWordResponseDto} from "../../../../core/dtos/words/IllustrationWordResponseDto";

type Props = ComponentProps & Readonly<{
    wordObject: WordFormServer2
}>

/**
 * Карточка с теорией: GIF, слово
 */
export const TheoryCard: FC<Props> = typedMemo(function TheoryCard(props) {
    return (
        <div className={clsx(styles.theoryCard)}>
            <div>
                <Typography
                    variant="h2"
                    className={styles.theoryCard__title}
                >
                    {props.wordObject.word}
                </Typography>
                <div className={styles.theoryCard__contentContainer}>
                    <div className={styles.theoryCard__images}>
                        <SignVideo
                            src={props.wordObject.illustrations[0].path}
                            className={styles.theoryCard__gif}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
