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

type SystemTestsCatalogBlock = {
    id: string;
    name: string
    wordsCount: number;
    completedWordsCount: number;
}

type SystemTestsCatalog = {
    themeList: (SystemTestsCatalogBlock & {
        description: string;
        units: (SystemTestsCatalogBlock & {
            levels: SystemTestsCatalogBlock[]
        })[]
    })[]
}

/**
 * Каталог системных тестов в тренировках
 */
export const SystemTests: FC<Props> = typedMemo(function SystemTests(props) {
    const {data: themeListWithUnits} = useQuery<GetThemeListWithUnitsResponse>("systemtests/themes/with-units/get", ThemesService.getListWithUnits)
    const {data: unitListWithLevels} = useQuery<GetUnitListWithLevelsResponse>("systemtests/units/with-levels/get", UnitService.getListWithLevels)
    const {data: trainingHistory} = useQuery<GetTrainingHistoryResponse>("traininghistory/get", UserHistoryService.getTrainingHistory)
    const [systemTestsCatalog, setSystemTestsCatalog] = useState<SystemTestsCatalog | null>(null);

    useEffect(() => {
        if (!themeListWithUnits || !unitListWithLevels || !trainingHistory) {
            return
        }

        const systemTestsCatalog: SystemTestsCatalog = {
            themeList: themeListWithUnits.themeList.map(themeItem => {
                const foundTheme = trainingHistory.themeInfoDalList?.find(themeHistory => themeHistory.themeId === themeItem.id);
                return {
                    ...themeItem,
                    completedWordsCount: foundTheme ? foundTheme.completedWordCount : 0,
                    units: themeItem.units.map(unitItem => {
                        const foundUnit = foundTheme?.unitInfoList.find((unitHistory: any) => unitHistory.unitId === unitItem.id)
                        const unitWithLevels = unitListWithLevels.units.find(unit => unit.id === foundUnit?.unitId)

                        return {
                            ...unitItem,
                            completedWordsCount: foundUnit ? foundUnit.completedWordCount : 0,
                            levels: unitWithLevels?.levels.map(levelItem => {
                                const foundLevel = foundUnit?.levelInfoList.find(themeLevel => themeLevel.levelId === levelItem.id)
                                return {
                                    ...levelItem,
                                    completedWordsCount: foundLevel ? foundLevel.completedWordCount : 0
                                }
                            }) || []
                        }
                    })
                }
            })
        }

        setSystemTestsCatalog(systemTestsCatalog);
    }, [themeListWithUnits, unitListWithLevels, trainingHistory])

    if (!systemTestsCatalog) {
        return null;
    }

    return (
        <Card className={styles.systemTests}>
            <Typography variant='h2'>
                Темы
            </Typography>
            <ScrollBox className={clsx(styles.systemTests__container, props.className)}>
                {
                    systemTestsCatalog.themeList.map(theme => (
                        <div className={styles.systemTests__theme}>
                            <SystemTestPreview
                                {...theme}
                                key={`SystemTestPreviewByTheme${theme.id}`}
                                type={TestTypeEnum.TestByTheme}
                            />
                            {
                                theme.units.map(unit => (
                                    <div className={styles.units}>
                                        <SystemTestPreview
                                            {...unit}
                                            key={`SystemTestPreviewByUnit${unit.id}`}
                                            type={TestTypeEnum.TestByUnit}
                                        />
                                        <div className={styles.levels}>
                                            {
                                                unit?.levels.map((level, index) => (
                                                    <>
                                                        <SystemTestPreview
                                                            {...level}
                                                            key={`SystemTestPreviewByLevel${level.id}`}
                                                            type={TestTypeEnum.TestByLevel}
                                                            number={index}
                                                            completedWordsCount={level.completedWordsCount}
                                                        />
                                                        <Typography variant="p" key={`delimiter${level.id}`}
                                                           className={styles.levels__delimiter}/>
                                                    </>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </ScrollBox>
        </Card>
    );
});
