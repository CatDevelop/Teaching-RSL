import React, {FC, useEffect, useState} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {ThemeBlock} from "../CatalogBlocks/ThemeBlock/ThemeBlock";
import {useQuery} from "react-query";
import {GetThemeListWithUnitsResponse, GetThemeWithUnitsResponse} from "../../../../core/models/themes/GetThemeListWithUnitsResponse";
import {ThemesService} from "../../../../api/services/themes";
import {GetUnitListWithLevelsResponse, GetUnitWithLevelsResponse} from "../../../../core/models/unit/GetUnitListWithLevelsResponse";
import {UnitService} from "../../../../api/services/unit";
import {ScrollBox} from "../../../../components/ScrollBox";
import styles from "./ThemesList.module.css"
import {Card} from "../../../../components/Card";
import {Typography} from "../../../../components/Typography";
import { UserFullHistoryRecordResponse } from "core/models/userHistory/UserFullHistoryRecordResponse";
import { UserService } from "api/services/user";

export const ThemesList: FC = typedMemo(function ThemesList() {
    const themeListWithUnits = useQuery<GetThemeListWithUnitsResponse>("themes/with-units/get", ThemesService.getListWithUnits)
    const unitListWithLevels = useQuery<GetUnitListWithLevelsResponse>("unit/with-levels/get", UnitService.getListWithLevels)
    const {data: userHistory} = useQuery<UserFullHistoryRecordResponse[]>("userthemeshistory/get", UserService.getThemesWithUnitsHistory)

    const [themes, setThemes] = useState<GetThemeWithUnitsResponse[]>([])
    const [units, setUnits] = useState<GetUnitWithLevelsResponse[]>([])

    useEffect(() => {
        if(userHistory && themeListWithUnits && unitListWithLevels) {
            themeListWithUnits.data?.themeList.forEach(theme => {
                const findedThemeHistory = userHistory.find(themeHistory => theme.id === themeHistory.themeId)
                if(!findedThemeHistory){
                    return
                }
                
                theme.completedWordsCount = findedThemeHistory.wordsCompletedCount

                findedThemeHistory.unitsHistory.forEach(unitHistory => {
                    const findedUnit = unitListWithLevels.data?.units.find(unit => unit.id === unitHistory.unitId)
                    if(!findedUnit){
                        return
                    }

                    findedUnit.completedWordsCount = unitHistory.unitWordsCount
                })
            })

            setThemes([...themeListWithUnits.data?.themeList ?? []])
            setUnits([...unitListWithLevels.data?.units ?? []])
        }
    }, [userHistory, themeListWithUnits,unitListWithLevels])

    if (!themeListWithUnits.data || !unitListWithLevels.data)
        return null;
    return (
        <Card className={styles.themeList}>
            <Typography variant='h2'>
                Темы
            </Typography>
            <ScrollBox className={styles.themeList__contentContainer}>
                {
                    themes.map(theme => {
                        const unitsWithLevel = theme.units.map(themeUnit => {
                            return units.find(unit => unit.id === themeUnit.id)!
                        })

                        return (
                            <ThemeBlock
                                id={theme.id}
                                name={theme.name}
                                completeWordsCount={theme.completedWordsCount ?? 0}
                                allWordsCount={theme.wordsCount}
                                units={unitsWithLevel}
                            />
                        )
                    })
                }
            </ScrollBox>
        </Card>
    )
})
