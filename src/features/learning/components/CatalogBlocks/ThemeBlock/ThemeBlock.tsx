import React, {FC} from "react";
import {typedMemo} from "../../../../../core/utils/typedMemo";
import {Typography} from "../../../../../components/Typography";
import {UnitBlock} from "../UnitBlock/UnitBlock";
import {GetUnitWithLevelsResponse} from "../../../../../core/models/unit/GetUnitListWithLevelsResponse";
import styles from "./ThemeBlock.module.css"

type Props = {
    id: string,
    name: string,
    completeWordsCount: number,
    allWordsCount: number,
    units: GetUnitWithLevelsResponse[]
}

/**
 * Компонент для тестов, не войдёт в прод
 */
export const ThemeBlock: FC<Props> = typedMemo(function ThemeBlock(props) {
    return (
        <div key={"themeBlock" + props.id} className={styles.themeBlock}>
            <div className={styles.themeBlock__titleContainer}>
                <Typography variant="h3" className={styles.themeBlock__titleContainer__title}>
                    {props.name}
                </Typography>
                <Typography variant="p" className={styles.themeBlock__titleContainer__wordCount}>
                    {props.completeWordsCount} / {props.allWordsCount}
                </Typography>
            </div>

            <div className={styles.themeBlock__units}>
                {
                    props.units ?
                        props.units.map(unit => {
                            return (
                                <UnitBlock
                                    id={unit.id}
                                    name={unit.name}
                                    completeWordsCount={unit.completedWordsCount ?? 0}
                                    allWordsCount={unit.wordsCount}
                                    levels={unit.levels}
                                />
                            )
                        })
                        :
                        <p>Нет разделов!</p>
                }
            </div>
        </div>
    )
})
