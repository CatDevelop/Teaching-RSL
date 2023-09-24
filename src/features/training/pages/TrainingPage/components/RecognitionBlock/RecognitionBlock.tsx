import { Card } from "../../../../../../components/Card";
import { typedMemo } from "../../../../../../core/utils/typedMemo";
import React, { FC } from "react";
import styles from "./RecognitionBlock.module.css";
import { Typography } from "../../../../../../components/Typography";

type Props = Readonly<{
    text: string
}>

export const RecognitionBlock: FC<Props> = typedMemo(function RecognitionBlock({
    text,
}){
    return (
        <Card className={styles.recognitionBlock}>
            <Typography variant="span" className={styles.recognitionBlock__title}>
                Покажите жест в камеру
            </Typography>
            <Typography variant="h2" className={styles.recognitionBlock__gesture}>
                {text}
            </Typography>

            <div className={styles.recognitionBlock__camera}>

            </div>

            <Typography variant="h3" className={styles.recognitionBlock__recognized}>
                Распознанные жесты
            </Typography>
            <Typography variant="span" className={styles.recognitionBlock__recognizedWords}>
                Банан
            </Typography>
        </Card>
    );
});
