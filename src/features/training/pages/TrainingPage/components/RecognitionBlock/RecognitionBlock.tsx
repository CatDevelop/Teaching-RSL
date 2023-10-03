import { Card } from "../../../../../../components/Card";
import { typedMemo } from "../../../../../../core/utils/typedMemo";
import React, { FC, useMemo } from "react";
import styles from "./RecognitionBlock.module.css";
import { Typography } from "../../../../../../components/Typography";
import { ComponentProps } from "../../../../../../core/models/ComponentProps";
import clsx from "clsx";

type Props = ComponentProps & Readonly<{
    text: string;
    next: () => void;
}>

export const RecognitionBlock: FC<Props> = typedMemo(function RecognitionBlock({
    text,
    next,
    className,
}){
    return (
        <Card className={clsx(styles.recognitionBlock, className)}>
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
