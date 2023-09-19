import { Card } from "../../../../../../components/Card";
import { typedMemo } from "../../../../../../core/utils/typedMemo";
import { FC } from "react";
import styles from "./WorkOnMistakes.module.css";
import { Typography } from "../../../../../../components/Typography";
import { Button } from "../../../../../../components/Button";
import { ComponentProps } from "../../../../../../core/models/ComponentProps";
import clsx from "clsx";

type Props = ComponentProps & Readonly<{
    missingWordsCount: number
}>

export const WorkOnMistakes: FC<Props> = typedMemo(function WorkOnMistakes(props){
    return (
        <Card className={clsx(styles.workOnMistakes, props.className)}>
            <div className={styles.workOnMistakes__words}>
                <Typography className={styles.workOnMistakes__wordsCount}>{props.missingWordsCount}</Typography>
                <Typography className={styles.workOnMistakes__wordsName}>слов <br/> пропущено</Typography>
            </div>
            <Button 
                variant="faded"
                className={styles.workOnMistakes__beginButton}>
                Начать работу над ошибками
            </Button>
        </Card>
    )
})