import React, {FC, useEffect, useState} from "react";
import clsx from "clsx";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {Typography} from "../../../../components/Typography";
import {SystemTestPreview} from "../SystemTestPreview";
import {ScrollBox} from "../../../../components/ScrollBox";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import styles from "./SystemTests.module.css";
import {GetThemeListWithUnitsResponse} from "../../../../core/models/themes/GetThemeListWithUnitsResponse";
import {ThemesService} from "../../../../api/services/themes";
import {useQuery} from "react-query";
import {Card} from "../../../../components/Card";
import {TestTypeEnum} from "../../../../core/models/themes/TestTypeEnum";
import {GetUnitListWithLevelsResponse} from "../../../../core/models/unit/GetUnitListWithLevelsResponse";
import {UnitService} from "../../../../api/services/unit";
import {GetTrainingHistoryResponse} from "../../../../core/models/userHistory/GetTrainingHistoryResponse";
import {UserHistoryService} from "../../../../api/services/userHistory";

type Props = ComponentProps;

/**
 * Каталог системных тестов в тренировках
 */
export const SystemTests: FC<Props> = typedMemo(function SystemTests(props) {
    const {data: themeListWithUnits} = useQuery<GetThemeListWithUnitsResponse>("systemtests/themes/with-units/get", ThemesService.getListWithUnits)
    const {data: unitListWithLevels} = useQuery<GetUnitListWithLevelsResponse>("systemtests/units/with-levels/get", UnitService.getListWithLevels)
    const {data: trainingHistory} = useQuery<GetTrainingHistoryResponse>("traininghistory/get", UserHistoryService.getTrainingHistory)
    const [parsedData, setParsedData] = useState<GetThemeListWithUnitsResponse | null>(null);

    useEffect(() => {
        if(!themeListWithUnits || !unitListWithLevels || !trainingHistory){
            return
        }

        const parsedData: GetThemeListWithUnitsResponse = {
            themeList: themeListWithUnits.themeList.map(themeItem => {
                const foundTheme = trainingHistory.themeInfoDalList?.find(themeHistory => themeHistory.themeId === themeItem.id);
                return {
                    ...themeItem,
                    completedWordsCount: foundTheme ? foundTheme.completedWordCount : 0,
                    units: themeItem.units.map(unitItem => {
                        const foundUnit = foundTheme?.unitInfoList.find((unitHistory: any) => unitHistory.unitId === unitItem.id)
                        return {
                            ...unitItem,
                            completedWordsCount: foundUnit ? foundUnit.completedWordCount : 0,
                            levels: unitListWithLevels.units.find(unit => unit.id === unitItem.id)?.levels
                        }
                    })
                }
            })
        }

        setParsedData(parsedData);
    }, [themeListWithUnits, unitListWithLevels, trainingHistory])

    if(!parsedData) {
        return null;
    }

    console.log("parsedData", parsedData)

    return (
        <Card className={styles.systemTests}>
            <Typography variant='h2'>
                Темы
            </Typography>
            <ScrollBox className={clsx(styles.systemTests__container, props.className)}>
                {parsedData.themeList.map(theme => (
                    <div className={styles.systemTests__theme} key={theme.id}>
                        <SystemTestPreview
                            {...theme}
                            key={`SystemTestPreviewByTheme${theme.id}`}
                            type={TestTypeEnum.TestByTheme}
                        />
                        {theme.units.map(unit => (
                            <div className={styles.units}>
                                <SystemTestPreview
                                    {...unit}
                                    key={`SystemTestPreviewByUnit${unit.id}`}
                                    type={TestTypeEnum.TestByUnit}
                                />
                                <div className={styles.levels}>
                                    {
                                        // @ts-ignore
                                        unit?.levels.map((level, index) => (
                                            <>
                                                <SystemTestPreview
                                                    {...level}
                                                    key={`SystemTestPreviewByLevel${level.id}`}
                                                    type={TestTypeEnum.TestByLevel}
                                                    number={index}
                                                />
                                                <p className={styles.levels__delimiter}/>
                                            </>
                                        ))
                                    }
                                </div>
                            </div>

                        ))}
                    </div>
                ))}
            </ScrollBox>
        </Card>
    );
});
