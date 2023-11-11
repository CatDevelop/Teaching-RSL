import React, {FC} from "react";
import {typedMemo} from "core/utils/typedMemo";
import {Card, CardHeader} from "components/Card";
import {ComponentProps} from "core/models/ComponentProps";
import clsx from "clsx";
import styles from "./Statistics.module.css";
import TargetSrc from "assets/images/Target.svg";
import TrophySrc from "assets/images/Trophy.svg";
import CalendarSrc from "assets/images/Calendar.svg";
import DictionarySrc from "assets/images/Dictionary.svg";
import { StatisticsItem } from "./StatisticsItem";

type Props = ComponentProps & Readonly<{

}>

/**
 * Статистика пользователя
 */
export const Statistics: FC<Props> = typedMemo(function Statistics(props){
    return (
        <Card className={clsx(props.className, styles.statistics)}>
            <CardHeader>Статистика</CardHeader>

            <div className={styles.statistics__blocks}>
                <StatisticsItem iconUrl={TargetSrc} iconAlt="Количество пройденных уроков" value="12" descriptionValue="уроков пройдено"/>
                <StatisticsItem iconUrl={TrophySrc} iconAlt="Количество трофеев" value="6" descriptionValue="трофеев получено"/>
                <StatisticsItem iconUrl={CalendarSrc} iconAlt="Количество дней обучения" value="10" descriptionValue="дней обучения"/>
                <StatisticsItem iconUrl={DictionarySrc} iconAlt="Количество изученных слов" value="6" descriptionValue="слов изучено"/>
            </div>
        </Card>
    )
})