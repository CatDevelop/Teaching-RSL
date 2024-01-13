import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {ThemeBlock} from "../CatalogBlocks/ThemeBlock/ThemeBlock";
import {useQuery} from "react-query";
import {GetThemeListWithUnitsResponse} from "../../../../core/models/themes/GetThemeListWithUnitsResponse";
import {ThemesService} from "../../../../api/services/themes";
import {GetUnitListWithLevelsResponse} from "../../../../core/models/unit/GetUnitListWithLevelsResponse";
import {UnitService} from "../../../../api/services/unit";
import {ScrollBox} from "../../../../components/ScrollBox";
import styles from "./ThemesList.module.css"
import {Card} from "../../../../components/Card";
import {Typography} from "../../../../components/Typography";

export const ThemesList: FC = typedMemo(function ThemesList() {
    const themeListWithUnits = useQuery<GetThemeListWithUnitsResponse>("themes/with-units/get", ThemesService.getListWithUnits)
    const unitListWithLevels = useQuery<GetUnitListWithLevelsResponse>("unit/with-levels/get", UnitService.getListWithLevels)

    if (!themeListWithUnits.data || !unitListWithLevels.data)
        return null;

    console.log(themeListWithUnits.data, unitListWithLevels.data)
    return (
        <Card className={styles.themeList}>
            <Typography variant='h2'>
                Темы
            </Typography>
            <ScrollBox className={styles.themeList__contentContainer}>
                {
                    themeListWithUnits.data.themeList.map(theme => {
                        const unitsWithLevel = theme.units.map(themeUnit => {
                            return unitListWithLevels.data.units.find(unit => unit.id === themeUnit.id)!
                        })

                        return (
                            <ThemeBlock
                                id={theme.id}
                                name={theme.name}
                                completeWordsCount={0}
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
