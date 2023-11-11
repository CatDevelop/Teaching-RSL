import React, {FC} from "react";
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

type Props = ComponentProps;

/** 
 * System tests
 */
export const SystemTests: FC<Props> = typedMemo(function SystemTests(props) {
    const {data} = useQuery<GetThemeListWithUnitsResponse>("systemtests/get", ThemesService.getListWithUnits)

    if (!data) {
        return null;
    }
    return (
        <Card className={styles.systemTests}>
            <Typography variant='h2'>
                Темы
            </Typography>
            <ScrollBox className={clsx(styles.systemTests__container, props.className)}>
                {data.themeList.map(theme => (
                    <div className={styles.systemTests__theme} key={theme.id}>
                        <Typography variant="h3" className={styles.systemTests__theme_title}>{theme.name}</Typography>
                        {theme.units.map(unit => (
                            <SystemTestPreview {...unit}/>
                        ))}
                    </div>
                ))}
            </ScrollBox>
        </Card>
    );
});
