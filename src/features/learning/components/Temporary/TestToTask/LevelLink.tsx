import React, {FC, useCallback} from "react";
import {typedMemo} from "../../../../../core/utils/typedMemo";
import {useNavigate} from "react-router-dom";
import styles from "./LevelLink.module.css"

type Props = {
    id: string,
    name: string,
    completeWordsCount: number,
    allWordsCount: number
}

export const LevelLink: FC<Props> = typedMemo(function TrainingCatalogPage(props) {
    const navigate = useNavigate()

    const toLevel = useCallback(() => navigate("/learning/" + props.id), [navigate, props.id])
    return (
        <div className={styles.levelLink} onClick={toLevel}>
            <p className={styles.levelLink__name}>
            {
                props.name
            }
            </p>
            <p className={styles.levelLink__wordsCount}>
                {
                    props.completeWordsCount + " / " + props.allWordsCount
                }
            </p>
        </div>
    )
})
