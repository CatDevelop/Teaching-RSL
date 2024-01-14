import React, {FC} from "react";
import {typedMemo} from "../../../../../../core/utils/typedMemo";
import {CircularProgress} from "@nextui-org/react";
import styles from "./ThemeProgress.module.css"
import {Typography} from "../../../../../../components/Typography";
import { UserThemeHistoryRecordResponse } from "core/models/userHistory/UserThemeHistoryRecordResponse";

type Props = UserThemeHistoryRecordResponse & Readonly<{}>

/**
 * Прогресс по теме
 */
export const ThemeProgress: FC<Props> = typedMemo(function ThemeProgress(props){
    return (
        <div className={styles.themeProgress}>
            <div className={styles.themeProgress__text}>
                <Typography variant='p' className={styles.themeProgress__title}>{props.themeName}</Typography>
            </div>

            <CircularProgress
                size="md"
                value={(props.wordsCompletedCount/props.wordsCompletedCount) * 100}
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