import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./TheoryCard.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import TheoryIconSVG from "../../../../assets/images/TheoryIcon.svg"
import {Typography} from "../../../../components/Typography";
import {SignVideo} from "../../../../components/SignVideo";
import {LearningBlock} from "../LearningBlock";
import {Word} from "../../../../core/models/Word";

type Props = ComponentProps & Readonly<{
    wordObject: any
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
                    {props.wordObject.firstRepresentation}
                </Typography>
                <div className={styles.theoryCard__contentContainer}>
                    <div className={styles.theoryCard__images}>
                        <SignVideo
                            src={props.wordObject.secondRepresentation}
                            className={styles.theoryCard__gif}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
