import { typedMemo } from "core/utils/typedMemo";
import React, { FC } from "react";
import styles from './SelectThemeDictionary.module.css';
import { Typography } from "components/Typography";
import { Card } from "components/Card";
import { ComponentProps } from "core/models/ComponentProps";
import clsx from "clsx";
import { ScrollBox } from "components/ScrollBox";

type Props = ComponentProps & Readonly<{
    themes: any[];
    onThemeClick: (section:any) => void;
}>

export const SelectThemeDictionary: FC<Props> = typedMemo(function SelectThemeDictionary(props){
    return (
        <Card className={clsx(styles.selectThemeDictionary, props.className)}>
            <Typography variant='h2' className={styles.selectThemeDictionary__title}>Темы</Typography>
            <ScrollBox className={styles.selectThemeDictionary__themesScroll}>
                {props.themes.map((theme, i) => (
                    <div className={styles.selectThemeDictionary__theme} key={i }>
                        <Typography 
                            variant='h3' 
                            className={styles.selectThemeDictionary__themeTitle}
                            onClick={() => props.onThemeClick(theme)}
                        >
                                {theme.name}
                            </Typography>
                        {
                            theme.sections.map((section: any,i:number) => 
                                <Typography 
                                    variant='p' 
                                    key={i} 
                                    className={styles.selectThemeDictionary__section}
                                >
                                    {section.name}
                                    </Typography>
                            )}
                    </div>
                ))}
            </ScrollBox>
        </Card>
    )
})