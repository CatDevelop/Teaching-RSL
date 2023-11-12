import React, {FC} from "react";
import {typedMemo} from "../../../../../core/utils/typedMemo";
import {Card, CardHeader} from "../../../../../components/Card";
import styles from "./Trophies.module.css"
import {Typography} from "../../../../../components/Typography";
import Trophy2 from "../../../../../assets/images/Trophy2.svg";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import clsx from "clsx";
import {ScrollBox} from "../../../../../components/ScrollBox";

type Props = ComponentProps & Readonly<{}>

/**
 * Трофеи пользователя
 */
export const Trophies: FC<Props> = typedMemo(function Trophies(props) {
    return (
        <Card className={clsx([props.className, styles.trophies])}>
            <CardHeader>Трофеи</CardHeader>
            <ScrollBox>
                <div className={styles.trophies__block}>
                    <div className={styles.trophies__item}>
                        <Typography variant="h3" className={styles.trophies__itemName}>Оверлорд</Typography>
                        <Typography variant="span" className={styles.trophies__itemDescription}>
                            Вы зарабатывали очки опыта и достигли 20 уровня
                        </Typography>
                        <img src={Trophy2} className={styles.trophies__itemIcon}/>
                    </div>

                    <div className={styles.trophies__item}>
                        <Typography variant="h3" className={styles.trophies__itemName}>Оверлорд</Typography>
                        <Typography variant="span" className={styles.trophies__itemDescription}>
                            Вы зарабатывали очки опыта и достигли 20 уровня
                        </Typography>
                        <img src={Trophy2} className={styles.trophies__itemIcon}/>
                    </div>

                    <div className={styles.trophies__item}>
                        <Typography variant="h3" className={styles.trophies__itemName}>Оверлорд</Typography>
                        <Typography variant="span" className={styles.trophies__itemDescription}>
                            Вы зарабатывали очки опыта и достигли 20 уровня
                        </Typography>
                        <img src={Trophy2} className={styles.trophies__itemIcon}/>
                    </div>
                </div>
            </ScrollBox>
        </Card>
    )
})
