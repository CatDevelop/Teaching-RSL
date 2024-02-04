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
import { UserService } from "api/services/user";
import { UserFullHistoryRecordResponse } from "core/models/userHistory/UserFullHistoryRecordResponse";

type Props = ComponentProps;

/**
 * System tests
 */
export const SystemTests: FC<Props> = typedMemo(function SystemTests(props) {
    const {data} = useQuery<GetThemeListWithUnitsResponse>("systemtests/get", ThemesService.getListWithUnits)
    const {data: userHistory} = useQuery<UserFullHistoryRecordResponse[]>("userthemeshistory/get", UserService.getThemesWithUnitsHistory)
    const [parsedData, setParsedData] = useState<GetThemeListWithUnitsResponse | null>(null);

    useEffect(() => {
        if(!data || !userHistory){
            return
        }

        const parsedData: GetThemeListWithUnitsResponse = {
            themeList: data?.themeList.map(themeItem => {
                const findedTheme = userHistory?.find(themeHistory => themeHistory.themeId === themeItem.id);
                return {
                    ...themeItem,
                    completedWordsCount: findedTheme ? findedTheme.wordsCompletedCount : 0,
                    units: themeItem.units.map(unitItem => {
                        const findedUnit = findedTheme?.unitsHistory.find(unitHistory => unitHistory.unitId === unitItem.id)
                        return {
                            ...unitItem,
                            completedWordsCount: findedUnit ? findedUnit.unitWordsCount : 0,
                        }
                    })
                }
            })
        }

        setParsedData(parsedData);
    }, [data, userHistory])

    if(!parsedData) {
        return null;
    }
    return (
        <Card className={styles.systemTests}>
            <Typography variant='h2'>
                Темы
            </Typography>
            <ScrollBox className={clsx(styles.systemTests__container, props.className)}>
                {parsedData.themeList.map(theme => (
                    <div className={styles.systemTests__theme} key={theme.id}>
                        <SystemTestPreview
                            id={theme.id}
                            name={theme.name}
                            type={TestTypeEnum.TestByTheme}
                            wordsCount={theme.wordsCount}
                        />
                        {theme.units.map(unit => (
                            <SystemTestPreview {...unit} type={TestTypeEnum.TestByUnit}/>
                        ))}
                    </div>
                ))}
            </ScrollBox>
        </Card>
    );
});
