import React, {FC} from "react";
import {typedMemo} from "../../../../../core/utils/typedMemo";
import styles from "./LevelList.module.css"
import {useQuery} from "react-query";
import {GetUnitListWithLevelsResponse} from "../../../../../core/models/unit/GetUnitListWithLevelsResponse";
import {UnitService} from "../../../../../api/services/unit";
import {GetThemeListWithUnitsResponse} from "../../../../../core/models/themes/GetThemeListWithUnitsResponse";
import {ThemesService} from "../../../../../api/services/themes";

/* Компонент для тестов, не войдёт в прод*/
export const LevelList: FC= typedMemo(function LevelList() {
    const themeListWithUnits = useQuery<GetThemeListWithUnitsResponse>("themes/with-units/get", ThemesService.getListWithUnits)
    const unitListWithLevels = useQuery<GetUnitListWithLevelsResponse>("unit/with-levels/get", UnitService.getListWithLevels)

    if(!themeListWithUnits.data || !unitListWithLevels.data)
        return null;

    console.log(themeListWithUnits, unitListWithLevels)

    return (
        <div className={styles.levelList}>
            {
                themeListWithUnits.data.themeList.map(theme => {
                    const unitsWithLevel = theme.units.map(themeUnit => {
                        return unitListWithLevels.data.units.find(unit => unit.id === themeUnit.id)
                    })

                    unitsWithLevel.map(unitWithLevel => {
                        unitWithLevel?.levels.map(level => {
                            console.log(theme.name, unitWithLevel.name, level.name)
                        })
                    })
                    return theme.name
                })
            }
        </div>
    )
})
