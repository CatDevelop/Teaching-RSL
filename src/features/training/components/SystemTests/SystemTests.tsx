import React, { FC, useState } from "react";
import clsx from "clsx";
import { typedMemo } from "../../../../core/utils/typedMemo";
import { Typography } from "../../../../components/Typography";
import { SystemTestPreview } from "../SystemTestPreview";
import { ScrollBox } from "../../../../components/ScrollBox";
import { ComponentProps } from "../../../../core/models/ComponentProps";
import styles from "./SystemTests.module.css";
import { GetThemeListWithUnitsResponse } from "../../../../core/models/themes/GetThemeListWithUnitsResponse";
import { ThemesService } from "../../../../api/services/themes";
import { useQuery } from "react-query";
import { themes } from "../../../../core/data";

type Props = ComponentProps;

/** System tests. */
export const SystemTests: FC<Props> = typedMemo(function SystemTests(props){
    //const {data} = useQuery<GetThemeListWithUnitsResponse>("systemtests/get", ThemesService.getListWithUnits)
    const [test, _] = useState(themes)

    return (
        <ScrollBox className={clsx(styles.systemTests, props.className)}>
            {test?.map(theme => (
                <div className={styles.systemTests__theme} key={theme.id}>
                    <Typography variant="h3">{theme.name}</Typography>
                    {theme.tests.map(unit => (
                        <SystemTestPreview {...unit}/>
                    ))}
                </div>
            ))}
        </ScrollBox>
    );
});
