import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {Card} from "../../../../components/Card";
import {clsx} from "clsx";
import styles from "../../pages/TrainingPage/TrainingPage.module.css";
import {Typography} from "../../../../components/Typography";
import {Button} from "../../../../components/Button";

type Props = {
    onStart: any
};

export const StartTraining: FC<Props> = typedMemo(function StartTraining(props) {
    return (
        <Card className={clsx(styles.trainingTask__startCard, styles.trainingTask__startAnimation)}>
            <Typography variant={"h2"}>
                Start training
            </Typography>
            <Typography variant={"p"} className={styles.trainingTask__startCardDescription}>
                You will be prompted with words that you must show to the camera.
                Our system will recognize your sign and display the word in green.
                Once successful, move on to the next word.
            </Typography>
            <Button
                variant={"solid"}
                color={"primary"}
                onClick={props.onStart}
                size={"lg"}
            >
                Start execution
            </Button>
        </Card>
    )
});
