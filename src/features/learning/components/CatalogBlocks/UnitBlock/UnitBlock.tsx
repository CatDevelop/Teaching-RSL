import React, {FC} from "react";
import {typedMemo} from "../../../../../core/utils/typedMemo";
import {Typography} from "../../../../../components/Typography";
import {LevelBlock} from "../LevelBlock/LevelBlock";
import {GetLevelResponseDto} from "../../../../../core/dtos/unit/GetUnitListWithLevelsResponseDto";
import styles from "./UnitBlock.module.css"
import {UnitCatalogPresentation} from "../../../../../components/TULCatalogPresentations/UnitCatalogPresentation";
import {LevelCatalogPresentation} from "../../../../../components/TULCatalogPresentations/LevelCatalogPresentation";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate()
    return (
        <div key={"unitBlock" + props.id} className={styles.unitBlock}>
            <UnitCatalogPresentation id={props.id} name={props.name} completeWordsCount={props.completeWordsCount} allWordsCount={props.allWordsCount}/>
            <div className={styles.unitBlock__levels}>
                {
                    props.levels.map((level, index) => {
                        return <>
                            <LevelCatalogPresentation
                                id={level.id}
                                number={index + 1}
                                completeWordsCount={level.completedWordsCount ?? 0}
                                disabled={false}
                                allWordsCount={level.wordsCount}
                                onClick={() => navigate("/learning/" + level.id)}
                            />
                            <p className={styles.unitBlock__levels__delimiter}/>
                        </>
                    })
                }
            </div>
        </div>
    )
})
