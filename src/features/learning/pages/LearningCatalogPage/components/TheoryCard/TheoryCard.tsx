import {typedMemo} from "../../../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./TheoryCard.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../../../core/models/ComponentProps";
import {Card} from "../../../../../../components/Card";
import TheoryIconSVG from "../../../../../../assets/images/TheoryIcon.svg"
import {Typography} from "../../../../../../components/Typography";
import {SignVideo} from "../../../../../../components/SignVideo";

type Props = ComponentProps & Readonly <{
    gifSource: string;
    imageSource?: string;
    word: string;
}>

/** Карточка с теорией: GIF, изображение, слово. */
export const TheoryCard: FC<Props> = typedMemo(function TheoryCard(props){
    return (
        <div className={clsx(styles.theoryCard)}>
            <Card className={clsx(styles.theoryCard__contentContainer, props.className)}>
                <div className={styles.theoryCard__titleContainer}>
                    <img src={TheoryIconSVG} alt={"Icon"}/>
                    <Typography variant="h3" className={styles.theoryCard__title}>
                        Теория
                    </Typography>
                </div>

                <div className={styles.theoryCard__images}>
                    <SignVideo src={props.gifSource}/>
                    {
                        props.imageSource &&
                            <img src={props.imageSource}
                                 alt={"Изображение для жеста" + props.word}
                                 className={styles.theoryCard__image}
                            />
                    }
                </div>

                <Typography variant="h1" className={styles.theoryCard__word}>
                    {props.word}
                </Typography>
            </Card>
        </div>
    );
});
