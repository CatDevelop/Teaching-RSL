import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {NavLink} from "react-router-dom";
import styles from "./LevelBlock.module.css"

type Props = {
    id: string,
    name: string,
    completeWordsCount: number,
    allWordsCount: number
}

/* Компонент для тестов, не войдёт в прод*/
export const LevelBlock: FC<Props> = typedMemo(function LevelBlock(props) {
    return (
        <NavLink to={"/learning/" + props.id} className={styles.levelLink}>
            <p className={styles.levelBlock__name}>
                {props.name}
            </p>
            <p className={styles.levelBlock__wordsCount}>
                {props.completeWordsCount} / {props.allWordsCount}
            </p>
        </NavLink>
    )
})
