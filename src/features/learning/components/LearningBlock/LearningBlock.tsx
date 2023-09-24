import {Card} from "../../../../components/Card";
import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, PropsWithChildren} from "react";
import styles from "./LearningBlock.module.css"
import {Typography} from "../../../../components/Typography";

type Props = PropsWithChildren & Readonly <{
    iconUrl: string;
    title: string;
}>

/** Learning block. */
export const LearningBlock: FC<Props> = typedMemo(function LearningBlock(props){
    return (
        <Card className={styles.learningBlock}>
            <div className={styles.learningBlock__header}>
                <img src={props.iconUrl} alt={`${props.title} icon`} className={styles.learningBlock__icon} />
                <Typography
                    variant="h3"
                    className={styles.taskContinue__textBlock}>
                    {props.title}
                </Typography>
            </div>
            <div className={styles.learningBlock__contentContainer}>
                {props.children}
            </div>

        </Card>
    );
});
