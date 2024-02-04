import React, {FC} from "react";
import {typedMemo} from "core/utils/typedMemo";
import {Card, CardHeader} from "components/Card";
import {ComponentProps} from "core/models/ComponentProps";
import clsx from "clsx";
import styles from "./Statistics.module.css";
import {ReactComponent as TargetIcon} from "assets/images/Target.svg";
import {ReactComponent as TrophyIcon} from "assets/images/Trophy.svg";
import {ReactComponent as CalendarIcon} from "assets/images/Calendar.svg";
import {ReactComponent as DictionaryIcon} from "assets/images/Dictionary.svg";
import { StatisticsItem } from "./StatisticsItem";
import { useQuery } from "react-query";
import { UserHistoryService } from "api/services/userHistory";

type Props = ComponentProps & Readonly<{

}>

/**
 * Статистика пользователя
 */
export const Statistics: FC<Props> = typedMemo(function Statistics(props){
    const {data: statistics} = useQuery('user-statistics', UserHistoryService.getStatistics);

    return (
        <Card className={clsx(props.className, styles.statistics)}>
            <CardHeader>Статистика</CardHeader>

            <div className={styles.statistics__blocks}>
                <StatisticsItem icon={TargetIcon} iconAlt="Количество пройденных уроков" value={statistics!.completedLevelsCount} descriptionValue="уроков пройдено"/>
                <StatisticsItem icon={TrophyIcon} iconAlt="Количество трофеев" value={statistics!.trophiesCount} descriptionValue="трофеев получено"/>
                <StatisticsItem icon={CalendarIcon} iconAlt="Количество дней обучения" value="1" descriptionValue="дней обучения"/>
                <StatisticsItem icon={DictionaryIcon} iconAlt="Количество изученных слов" value={statistics!.completedWordsCount} descriptionValue="слов изучено"/>
            </div>
        </Card>
    )
})