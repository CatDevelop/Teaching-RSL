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

/**
 *  Компонент для тестов, не войдёт в прод
 */
export const UnitBlock: FC<Props> = typedMemo(function UnitBlock(props) {
    return (
        <div key={"unitBlock" + props.id} className={styles.unitBlock}>
            <Typography variant="p" className={styles.unitBlock__name}>
                {props.name}
            </Typography>
            <div className={styles.unitBlock__levels}>
                {
                    props.levels.map((level, index) => {
                        return <>
                            <LevelBlock
                                id={level.id}
                                number={index + 1}
                                completeWordsCount={10}
                                disabled={false}
                                allWordsCount={level.wordsCount}
                            />
                            <p className={styles.unitBlock__levels__delimiter}/>
                        </>
                    })
                }
            </div>
        </div>
    )
})
