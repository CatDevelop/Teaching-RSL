import { typedMemo } from "../../../../../../core/utils/typedMemo";
import React, { FC } from "react";
import styles from "./SystemTests.module.css";
import { Typography } from "../../../../../../components/Typography";
import { SystemTestPreview } from "../SystemTestPreview";
import { ScrollBox } from "../../../../../../components/ScrollBox";
import { ComponentProps } from "../../../../../../core/models/ComponentProps";
import clsx from "clsx";

type TempTest = {
    name: string;
    id: number;
    color: string;
    tests: {
        name: string,
        allWordsCount: number;
        passedWordsCount: number;
        id: number;
    }[];
}

type Props = ComponentProps & Readonly<{
    themes: TempTest[];
}>

export const SystemTests: FC<Props> = typedMemo(function SystemTests(props){
    return (
        <ScrollBox className={clsx(styles.systemTests, props.className)}>
            {props.themes.map(theme => (
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