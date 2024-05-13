import React, {FC} from "react";
import {typedMemo} from "../../../../../core/utils/typedMemo";
import {Card, CardHeader} from "../../../../../components/Card";
import styles from "./Trophies.module.css"
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import clsx from "clsx";
import {ScrollBox} from "../../../../../components/ScrollBox";
import {useAchievements} from "../../../../achievement/hooks/useAchievements";
import {Typography} from "../../../../../components/Typography";

type Props = ComponentProps & Readonly<{}>

/**
 * Трофеи пользователя
 */
export const Trophies: FC<Props> = typedMemo(function Trophies(props) {
    const achievements = useAchievements();

    return (
        <Card className={clsx([props.className, styles.trophies])}>
            <CardHeader>Trophies</CardHeader>
            <ScrollBox>
                <div className={styles.trophies__block}>
                    {
                        achievements.map((achievement, index) => (
                            <div className={styles.trophies__item}>
                                <Typography variant="h3" className={styles.trophies__itemName}>
                                    {achievement.name}
                                </Typography>
                                <div className={styles.trophies__itemIcon}>
                                    {achievement.image}
                                </div>
                                <Typography variant="span" className={styles.trophies__itemDescription}>
                                    {achievement.description}
                                </Typography>
                            </div>
                        ))
                    }
                </div>
            </ScrollBox>
        </Card>
    )
})
