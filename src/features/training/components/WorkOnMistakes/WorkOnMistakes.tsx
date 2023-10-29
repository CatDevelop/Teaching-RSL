import {Card} from "../../../../components/Card";
import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./WorkOnMistakes.module.css";
import {Typography} from "../../../../components/Typography";
import {Button} from "../../../../components/Button";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import clsx from "clsx";

type Props = ComponentProps & Readonly<{
    missingWordsCount: number
}>

export const WorkOnMistakes: FC<Props> = typedMemo(function WorkOnMistakes(props) {
    return (
        <Card className={clsx(styles.workOnMistakes, props.className)}>
            <Typography variant='h2'>
                Слов пропущено: {props.missingWordsCount}
            </Typography>
            <Button
                variant="light"
                className={styles.workOnMistakes__beginButton}
            >
                Начать работу над ошибками
            </Button>
        </Card>
    )
})
