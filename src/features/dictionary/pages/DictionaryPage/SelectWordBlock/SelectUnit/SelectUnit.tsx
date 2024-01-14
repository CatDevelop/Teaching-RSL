import { typedMemo } from "core/utils/typedMemo";
import React, { FC } from "react";
import styles from './SelectUnit.module.css';
import { Typography } from "components/Typography";
import { ComponentProps } from "core/models/ComponentProps";
import { ScrollBox } from "components/ScrollBox";
import { NavLink } from "react-router-dom";
import { Link } from "@nextui-org/react";
import {useQuery} from "react-query";
import {ThemesService} from "../../../../../../api/services/themes";

type Props = ComponentProps & Readonly<{}>

export const SelectUnit: FC<Props> = typedMemo(function SelectUnit(props){
    const {data: themes} = useQuery(['themes-with-units'], () => ThemesService.getListWithUnits());

    return (
        <>
            <Typography variant='h2' className={styles.selectUnit__title}>Темы</Typography>
            <ScrollBox className={styles.selectUnit__themesScroll}>
                {themes?.themeList.map((theme, i) => (
                    <div className={styles.selectUnit__theme} key={i }>
                        <Link
                            as={NavLink}  
                            to={`/dictionary/${theme.id}`}
                            className={styles.selectUnit__themeTitle}
                        >
                                {theme.name}
                        </Link>
                        {
                            theme.units.map((unit,i) =>
                                <Link 
                                    as={NavLink}  
                                    key={i} 
                                    to={`/dictionary/${theme.id}/${unit.id}`}
                                    className={styles.selectUnit__section}
                                >
                                    {unit.name}
                                </Link>
                            )}
                    </div>
                ))}
            </ScrollBox>
        </>
    )
})