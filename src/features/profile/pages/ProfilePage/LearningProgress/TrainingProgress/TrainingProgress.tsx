import React, {FC} from "react";
import {typedMemo} from "../../../../../../core/utils/typedMemo";
import {CircularProgress} from "@nextui-org/react";
import styles from "./TrainingProgress.module.css"
import {Typography} from "../../../../../../components/Typography";
import {TrainingHistoryTheme} from "../../../../../../core/models/userHistory/TrainingHistoryTheme";

type Props = TrainingHistoryTheme & Readonly<{}>

/**
 * Прогресс по теме в тренировках
 */
export const TrainingProgress: FC<Props> = typedMemo(function ThemeProgress(props){
    return (
        <div className={styles.themeProgress}>
            <div className={styles.themeProgress__text}>
                <Typography variant='p' className={styles.themeProgress__title}>{props.themeName}</Typography>
                {/*Todo добавить потом описание, если будет на бэке*/}
                <Typography variant='span' className={styles.themeProgress__description}>
                    {/*{props.description}*/}
                </Typography>
            </div>

            <CircularProgress
                size="md"
                value={(props.completedWordCount/props.wordCount) * 100}
                color="secondary"
                showValueLabel
                classNames={{
                    svg: styles.themeProgress__chartSvg,
                    indicator: styles.themeProgress__chartIndicator,
                    value: styles.themeProgress__chartValue,
                }}
            />
        </div>
    )
})
