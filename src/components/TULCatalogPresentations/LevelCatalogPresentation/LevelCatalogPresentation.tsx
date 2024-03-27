import React, {FC, useCallback} from "react";
import {typedMemo} from "../../../core/utils/typedMemo";
import styles from "./LevelCatalogPresentation.module.css"
import {clsx} from "clsx";
import {ReactComponent as Star} from 'assets/images/Star.svg';

type Props = {
    id: string,
    number: number,
    disabled: boolean,
    completeWordsCount: number,
    allWordsCount: number,
    onClick?: () => void
}

/**
 * Отображение уровня в каталоге
 */
export const LevelCatalogPresentation: FC<Props> = typedMemo(function LevelCatalogPresentation(props) {
    const getLevelClass = useCallback(() => {
            if (props.completeWordsCount >= props.allWordsCount)
                return styles.levelLink_completed
            if (props.completeWordsCount !== props.allWordsCount && props.completeWordsCount !== 0)
                return styles.levelLink_partCompleted
            if (props.disabled)
                return styles.levelLink_disabled
            return;
        },
        [props.disabled, props.completeWordsCount, props.allWordsCount]
    )

    return (
        <div className={clsx(styles.levelLink, getLevelClass())} onClick={props.onClick} key={`levelCatalogPresentation${props.id}`}>
            <Star className={clsx(styles.levelIcon, getLevelClass())}/>
        </div>
    )
})
