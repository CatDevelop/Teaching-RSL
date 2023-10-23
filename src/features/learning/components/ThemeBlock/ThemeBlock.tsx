import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {Typography} from "../../../../components/Typography";
import {UnitBlock} from "../UnitBlock/UnitBlock";
import {GetUnitWithLevelsResponse} from "../../../../core/models/unit/GetUnitListWithLevelsResponse";
import styles from "./ThemeBlock.module.css"

type Props = {
    id: string,
    name: string,
    completeWordsCount: number,
    allWordsCount: number,
    units: GetUnitWithLevelsResponse[]
}

/* Компонент для тестов, не войдёт в прод*/
export const ThemeBlock: FC<Props> = typedMemo(function ThemeBlock(props) {
    return (
        <div key={"themeBlock" + props.id}>
            <Typography variant="h2">
                {props.name}
            </Typography>
            <div className={styles.themeBlock__units}>
                {
                    props.units ?
                    props.units.map(unit => {
                            return <UnitBlock id={unit.id} name={unit.name} completeWordsCount={0} allWordsCount={unit.wordsCount} levels={unit.levels}/>
                    })
                        :
                        <p>Нет разделов!</p>
                }
            </div>
        </div>
    )
})
