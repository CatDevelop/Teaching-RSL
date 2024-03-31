import React, {FC} from "react";
import {typedMemo} from "../../../core/utils/typedMemo";
import {Typography} from "../../Typography";
import styles from "./UnitCatalogPresentation.module.css"
import {ReactComponent as DoneIcon} from "../../../assets/images/DoneIcon.svg"

type Props = {
    id: string,
    name: string,
    completeWordsCount: number,
    allWordsCount: number,
    onClick?: () => void
}

/**
 * Отображение юнита в каталоге
 */
export const UnitCatalogPresentation: FC<Props> = typedMemo(function ThemeCatalogPresentation(props) {
    return (
        <div className={styles.container} onClick={props.onClick} key={`unitCatalogPresentation${props.id}`}>
            <Typography variant="p" className={styles.name}>
                {props.name}
            </Typography>
            <Typography variant="p" className={styles.wordCount}>
                {Math.min(props.completeWordsCount, props.allWordsCount)} / {props.allWordsCount}
            </Typography>
            {
                props.allWordsCount === props.completeWordsCount &&
                <DoneIcon/>
            }
        </div>
    )
})
