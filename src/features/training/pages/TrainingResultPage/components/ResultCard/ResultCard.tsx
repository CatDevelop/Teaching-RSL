import { typedMemo } from "../../../../../../core/utils/typedMemo";
import React, { FC } from "react";
import styles from "./ResultCard.module.css";
import { ComponentProps } from "../../../../../../core/models/ComponentProps";
import { Typography } from "../../../../../../components/Typography";
import clsx from "clsx";

type Props = ComponentProps & Readonly<{
    title: string;
    iconUrl: string;
    content: string;
}>

/** Training result card. */
export const ResultCard: FC<Props> = typedMemo(function ResultCard({
    className,
    iconUrl,
    content,
    title,
}){
    return (
        <div className={clsx(styles.resultCard, className)}>
            <Typography variant="span" className={styles.resultCard__title}>{title}</Typography>
            <div className={styles.resultCard__result}>
                <img src={iconUrl} className={styles.resultCard__resultIcon} alt="Your result"/>
                <Typography variant="span" className={styles.resultCard__resultContent}>
                    {content}
                </Typography>
            </div>
        </div>
    );
});
