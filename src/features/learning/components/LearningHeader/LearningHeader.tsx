import {Card} from "../../../../components/Card";
import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./LearningHeader.module.css"
import {Typography} from "../../../../components/Typography";
import {ProgressBar} from "../../../../components/ProgressBar";

type Props = Readonly<{
    type: string;
    name: string;
    currentStep: number;
    stepCount: number
}>

/**
 * Верхняя информационная панель для обучения
 */
export const LearningHeader: FC<Props> = typedMemo(function LearningHeader(props) {
    return (
        <Card className={styles.learningHeader}>
            <div className={styles.learningHeader__info}>
                <div className={styles.learningHeader__nameContainer}>
                    <Typography
                        variant="h3"
                        className={styles.learningHeader__name}
                    >
                        {props.name}
                    </Typography>
                </div>
                <Typography
                    variant="p"
                    className={styles.learningHeader__type}
                >
                    {props.type === "theory" ? "Теория" : props.type === "test" ? "Тест" : "Задание"}
                </Typography>
            </div>
            <div className={styles.learningHeader__progressBarContainer}>
                <ProgressBar currentStep={props.currentStep - 1} stepCount={props.stepCount}/>
            </div>
        </Card>
    );
});
