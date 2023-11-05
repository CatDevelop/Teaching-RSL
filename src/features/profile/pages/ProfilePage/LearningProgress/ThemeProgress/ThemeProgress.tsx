import React, {FC} from "react";
import {typedMemo} from "../../../../../../core/utils/typedMemo";
import {CircularProgress} from "@nextui-org/react";
import styles from "./ThemeProgress.module.css"
import {Typography} from "../../../../../../components/Typography";

type Props = Readonly<{

}>

/**
 * Прогресс по теме
 */
export const ThemeProgress: FC<Props> = typedMemo(function ThemeProgress(props){
    return (
        <div className={styles.themeProgress}>
            <div className={styles.themeProgress__text}>
                <Typography variant='h3' className={styles.themeProgress__title}>Общеупотребительные слова</Typography>
                <Typography variant='p' className={styles.themeProgress__description}>Откройте мир дома и домашних предметов</Typography>
            </div>

            <CircularProgress
                size="md"
                value={70}
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