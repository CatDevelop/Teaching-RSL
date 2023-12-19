import {Card} from "../../../../components/Card";
import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, PropsWithChildren} from "react";
import styles from "./LearningBlock.module.css"
import {Typography} from "../../../../components/Typography";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import clsx from "clsx";

type Props = PropsWithChildren & ComponentProps & Readonly <{
    iconUrl: string;
    title: string;
}>

/**
 * Learning block.
 */
export const LearningBlock: FC<Props> = typedMemo(function LearningBlock(props){
    return (
        <div className={styles.learningBlock}>
            <div className={styles.learningBlock__header}>
                <Typography
                    variant="h2"
                    className={styles.learningBlock__title}>
                    {props.title}
                </Typography>
            </div>
            <div className={styles.learningBlock__contentContainer}>
                {props.children}
            </div>
        </div>
    );
});
