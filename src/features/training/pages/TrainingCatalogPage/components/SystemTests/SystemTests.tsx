import React, { FC, useState } from "react";
import clsx from "clsx";
import { typedMemo } from "../../../../../../core/utils/typedMemo";
import { Typography } from "../../../../../../components/Typography";
import { SystemTestPreview } from "./components/SystemTestPreview";
import { ScrollBox } from "../../../../../../components/ScrollBox";
import { ComponentProps } from "../../../../../../core/models/ComponentProps";
import styles from "./SystemTests.module.css";
import { themes as themesTemp } from "../../../../data";

type TempTest = {
    name: string;
    id: number;
    color: string;
    tests: {
        name: string,
        allWordsCount: number;
        passedWordsCount: number; // TODO изменить название, passed - это пропущенный, а мы отображаем пройденные
        id: number;
    }[];
}

type Props = ComponentProps

/** System tests. */
export const SystemTests: FC<Props> = typedMemo(function SystemTests(props){
    const [themes, setThemes] = useState<TempTest[]>(themesTemp);

    return (
        <ScrollBox className={clsx(styles.systemTests, props.className)}>
            {themes.map(theme => (
                <div className={styles.systemTests__theme} key={theme.id}>
                    <Typography variant="h3">{theme.name}</Typography>
                    {theme.tests.map(test => (
                        <SystemTestPreview
                            color={theme.color}
                            name={test.name}
                            allWordsCount={test.allWordsCount}
                            passedWordsCount={test.passedWordsCount}
                            id={test.id}/>
                    ))}
                </div>
            ))}
        </ScrollBox>
    );
});
