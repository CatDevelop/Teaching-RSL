import {Card} from "../../../../components/Card";
import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback} from "react";
import styles from "./WorkOnMistakes.module.css";
import {Typography} from "../../../../components/Typography";
import {Button} from "../../../../components/Button";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import clsx from "clsx";
import { useNavigate } from "react-router";

type Props = ComponentProps & Readonly<{
    missingWordsCount: number
}>

export const WorkOnMistakes: FC<Props> = typedMemo(function WorkOnMistakes(props) {
    const navigate = useNavigate();

    const onOpen = useCallback(() => {
        navigate(`/training/reflection`)
    }, [navigate])

    return (
        <Card className={clsx(styles.workOnMistakes, props.className)}>
            <Typography variant='h2'>
                Missing words: {props.missingWordsCount}
            </Typography>
            <Button
                variant="light"
                onClick={onOpen}
                className={styles.workOnMistakes__beginButton}
            >
                Start working on mistakes
            </Button>
        </Card>
    )
})
