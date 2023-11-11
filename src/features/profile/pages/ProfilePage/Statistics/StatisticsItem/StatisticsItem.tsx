import { Typography } from "components/Typography";
import { typedMemo } from "core/utils/typedMemo";
import React, { FC } from "react";
import styles from "./StatisticsItem.module.css"

type Props = Readonly<{
    /**
     * Ссылка на иконку параметра
     */
    iconUrl: string;

    /**
     * Описание иконки параметра
     */
    iconAlt: string;

    /**
     * Значение параметра
     */
    value: number | string;

    /**
     * Пояснение к значению параметра
     */
    descriptionValue: string;
}>

/**
 * Элемент статистики пользователя
 */
export const StatisticsItem: FC<Props> = typedMemo(function StatisticsItem(props){
    return (
        <div className={styles.statisticsItem}>
            <img src={props.iconUrl} alt={props.iconAlt} className={styles.statisticsItem__icon}/>
            <Typography variant="p" className={styles.statisticsItem__value}>{props.value}</Typography>
            <Typography variant="span" className={styles.statisticsItem__description}>{props.descriptionValue}</Typography>
        </div>
    )
})