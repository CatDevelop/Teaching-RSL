import React, {FC, ReactElement} from 'react';

import {typedMemo} from "../../../../core/utils/typedMemo";
import {ComponentProps} from "../../../../core/models/ComponentProps";

import styles from './AchievementToast.module.css';
import {Typography} from "../../../../components/Typography";
import {Link} from "react-router-dom";

export type Props = ComponentProps & Readonly<{
    /**
     * Иконка достижения
     */
    image: ReactElement;

    /**
     * Название достижения
     */
    name: string;
}>;

/**
 * Уведомление о достижении
 */
export const AchievementToast: FC<Props> = typedMemo(function AchievementToast(props) {
    return (
        <Link className={styles.toast} to={'/profile'}>
            <div className={styles.badge}/>
            <Typography variant="span" className={styles.description}>
                У вас новое достижение!
            </Typography>
            <Typography className={styles.name}>
                {props.name}
            </Typography>
            <div className={styles.imageContainer}>
                {props.image}
            </div>
        </Link>
    );
});
