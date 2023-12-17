import { typedMemo } from "core/utils/typedMemo";
import React, { FC } from "react";
import styles from './SelectUnit.module.css';
import { Typography } from "components/Typography";
import { Card } from "components/Card";
import { ComponentProps } from "core/models/ComponentProps";
import clsx from "clsx";
import { ScrollBox } from "components/ScrollBox";
import { NavLink } from "react-router-dom";
import { Link } from "@nextui-org/react";

type Props = ComponentProps & Readonly<{
    themes: any[];
}>

export const SelectUnit: FC<Props> = typedMemo(function SelectUnit(props){
    return (
        <Card className={clsx(styles.selectUnit, props.className)}>
            <Typography variant='h2' className={styles.selectUnit__title}>Темы</Typography>
            <ScrollBox className={styles.selectUnit__themesScroll}>
                {props.themes.map((theme, i) => (
                    <div className={styles.selectUnit__theme} key={i }>
                        <Link
                            as={NavLink}  
                            to={`/dictionary/${theme.id}`}
                            className={styles.selectUnit__themeTitle}
                        >
                                {theme.name}
                        </Link>
                        {
                            theme.sections.map((section: any,i:number) => 
                                <Link 
                                    as={NavLink}  
                                    key={i} 
                                    to={`/dictionary/${theme.id}/${section.id}`}
                                    className={styles.selectUnit__section}
                                >
                                    {section.name}
                                </Link>
                            )}
                    </div>
                ))}
            </ScrollBox>
        </Card>
    )
})