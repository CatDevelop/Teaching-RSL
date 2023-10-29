import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {Typography} from "../../../../components/Typography";
import {LevelBlock} from "../LevelBlock/LevelBlock";
import {GetLevelResponseDto} from "../../../../core/dtos/unit/GetUnitListWithLevelsResponseDto";
import styles from "./UnitBlock.module.css"

type Props = {
    id: string,
    name: string,
    completeWordsCount: number,
    allWordsCount: number,
    levels: readonly GetLevelResponseDto[]
}

/* Компонент для тестов, не войдёт в прод*/
export const UnitBlock: FC<Props> = typedMemo(function UnitBlock(props) {
    return (
        <div key={"unitBlock" + props.id} className={styles.unitBlock}>
            <Typography variant="h2" className={styles.unitBlock__name}>
                {props.name}
            </Typography>
            <div className={styles.unitBlock__levels}>
                {
                    props.levels.map(level => {
                        return <LevelBlock id={level.id} name={level.name} completeWordsCount={0} allWordsCount={level.wordsCount}/>
                    })
                }
            </div>
        </div>
    )
})
