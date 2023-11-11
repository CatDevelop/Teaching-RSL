import React, {FC, useCallback} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {NavLink} from "react-router-dom";
import styles from "./LevelBlock.module.css"
import {clsx} from "clsx";
import {Typography} from "../../../../components/Typography";

type Props = {
    id: string,
    number: number,
    disabled: boolean,
    completeWordsCount: number,
    allWordsCount: number
}

/**
* Ссылка на уровень 
*/
export const LevelBlock: FC<Props> = typedMemo(function LevelBlock(props) {
    const getLevelClass = useCallback(() => {
            if (props.completeWordsCount === props.allWordsCount)
                return styles.levelLink_completed
            if (props.disabled)
                return styles.levelLink_disabled
            return;
        },
        [props.disabled, props.completeWordsCount, props.allWordsCount]
    )

    return (
        <NavLink to={"/learning/" + props.id} className={clsx(styles.levelLink, getLevelClass())}>
            <Typography variant='p' className={styles.levelBlock__number}>
                {props.number}
            </Typography>
        </NavLink>
    )
})
