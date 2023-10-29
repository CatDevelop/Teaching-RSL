import React, {FC} from "react";
import {typedMemo} from "../../../../../core/utils/typedMemo";
import {NavLink, useNavigate} from "react-router-dom";
import styles from "./LevelLink.module.css"

type Props = {
    id: string,
    name: string,
    completeWordsCount: number,
    allWordsCount: number
}

/* Компонент для тестов, не войдёт в прод*/
export const LevelLink: FC<Props> = typedMemo(function LevelLink(props) {
    return (
        <NavLink to={"/learning/" + props.id} className={styles.levelLink}>
            <p className={styles.levelLink__name}>
                {props.name}
            </p>
            <p className={styles.levelLink__wordsCount}>
                {props.completeWordsCount} / {props.allWordsCount}
            </p>
        </NavLink>
    )
})
