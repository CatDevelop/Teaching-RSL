import React, {FC} from "react";
import {typedMemo} from "../../../core/utils/typedMemo";
import {Typography} from "../../Typography";
import styles from "./ThemeCatalogPresentation.module.css"

type Props = {
    id: string,
    name: string,
    completeWordsCount: number,
    allWordsCount: number,
    onClick?: () => void
}

/**
 * Отображение темы в каталоге
 */
export const ThemeCatalogPresentation: FC<Props> = typedMemo(function ThemeCatalogPresentation(props) {
    return (
        <div className={styles.container} onClick={props.onClick} key={`themeCatalogPresentation${props.id}`}>
            <Typography variant="h3" className={styles.title}>
                {props.name}
            </Typography>
            <Typography variant="p" className={styles.wordCount}>
                {Math.min(props.completeWordsCount, props.allWordsCount)} / {props.allWordsCount}
            </Typography>
        </div>
    )
})
