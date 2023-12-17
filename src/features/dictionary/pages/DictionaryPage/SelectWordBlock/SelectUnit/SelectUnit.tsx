import { typedMemo } from "core/utils/typedMemo";
import React, { FC } from "react";
import styles from './SelectUnit.module.css';
import { Typography } from "components/Typography";
import { Card } from "components/Card";
import { ComponentProps } from "core/models/ComponentProps";
import clsx from "clsx";
import { ScrollBox } from "components/ScrollBox";
import { useNavigate } from "react-router-dom";

type Props = ComponentProps & Readonly<{
    themes: any[];
}>

export const SelectUnit: FC<Props> = typedMemo(function SelectUnit(props){
    const navigate = useNavigate();

    return (
        <Card className={clsx(styles.selectUnit, props.className)}>
            <Typography variant='h2' className={styles.selectUnit__title}>Темы</Typography>
            <ScrollBox className={styles.selectUnit__themesScroll}>
                {props.themes.map((theme, i) => (
                    <div className={styles.selectUnit__theme} key={i }>
                        <Typography 
                            variant='h3' 
                            className={styles.selectUnit__themeTitle}
                            onClick={() => navigate(theme.id)}
                        >
                                {theme.name}
                            </Typography>
                        {
                            theme.sections.map((section: any,i:number) => 
                                <Typography 
                                    variant='p' 
                                    key={i} 
                                    onClick={() => navigate(`${theme.id}/${section.id}`)}
                                    className={styles.selectUnit__section}
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