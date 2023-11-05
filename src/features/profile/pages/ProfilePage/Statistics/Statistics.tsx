import React, {FC} from "react";
import {typedMemo} from "../../../../../core/utils/typedMemo";
import {Card, CardHeader} from "../../../../../components/Card";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import clsx from "clsx";
import styles from "./Statistics.module.css";
import {Typography} from "../../../../../components/Typography";
import TargetSrc from "../../../../../assets/images/Target.svg";
import TrophySrc from "../../../../../assets/images/Trophy.svg";
import CalendarSrc from "../../../../../assets/images/Calendar.svg";
import DictionarySrc from "../../../../../assets/images/Dictionary.svg";

type Props = ComponentProps & Readonly<{

}>

/**
 * Статистика пользователя
 */
export const Statistics: FC<Props> = typedMemo(function Statistics(props){
    return (
        <Card className={clsx(props.className)}>
            <CardHeader>Статистика</CardHeader>

            <div className={styles.statistics__blocks}>
                <div className={styles.statistics__item}>
                    <img src={TargetSrc} alt="Количество пройденных уроков" className={styles.statistics__icon}/>
                    <Typography variant="p" className={styles.statistics__value}>12</Typography>
                    <Typography variant="span" className={styles.statistics__description}>уроков пройдено</Typography>
                </div>

                <div className={styles.statistics__item}>
                    <img src={TrophySrc} alt="Количество трофеев" className={styles.statistics__icon}/>
                    <Typography variant="p" className={styles.statistics__value}>6</Typography>
                    <Typography variant="span" className={styles.statistics__description}>трофеев получено</Typography>
                </div>

                <div className={styles.statistics__item}>
                    <img src={CalendarSrc} alt="Количество дней обучения" className={styles.statistics__icon}/>
                    <Typography variant="p" className={styles.statistics__value}>10</Typography>
                    <Typography variant="span" className={styles.statistics__description}>дней обучения</Typography>
                </div>

                <div className={styles.statistics__item}>
                    <img src={DictionarySrc} alt="Количество изученных слов" className={styles.statistics__icon}/>
                    <Typography variant="p" className={styles.statistics__value}>6</Typography>
                    <Typography variant="span" className={styles.statistics__description}>слов изучено</Typography>
                </div>
            </div>
        </Card>
    )
})