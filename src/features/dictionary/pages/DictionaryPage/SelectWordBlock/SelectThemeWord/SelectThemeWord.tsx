import { Card } from "components/Card";
import { ScrollBox } from "components/ScrollBox";
import { typedMemo } from "core/utils/typedMemo";
import React, { FC, useMemo } from "react";
import styles from "./SelectThemeWord.module.css";
import { Typography } from "components/Typography";
import { ComponentProps } from "core/models/ComponentProps";
import clsx from "clsx";
import { NavLink, useParams } from "react-router-dom";
import { Link } from "@nextui-org/react";
import { ArrowIcon } from "components/Icons";

type Props = ComponentProps & Readonly<{
    themes: any[];
}>

/**
 * Выбрать слово из темы
 */
export const SelectThemeWord: FC<Props> = typedMemo(function SelectThemeWord(props){
    const {themeId} = useParams<{themeId: string}>();
    const theme = useMemo(() => props.themes.find(theme => theme.id === themeId), [themeId, props.themes]);

    return (
        <Card className={clsx(props.className)}>
            <div className={styles.selectThemeWord__header}>
                <NavLink to={`/dictionary`}>
                    <ArrowIcon className={styles.selectThemeWord__backIcon}/>
                </NavLink>
                
                <Typography variant='h2' className={styles.selectThemeWord__name}>{theme.name}</Typography>
            </div>
            
            <ScrollBox className={styles.selectThemeWord__scroll}>
                {
                    theme.sections.map((section:any, i: number) => (
                        <div className={styles.selectThemeWord__section} key={i}>
                            <Link 
                                as={NavLink}
                                to={`/dictionary/${themeId}/${section.id}`}
                                className={styles.selectThemeWord__sectionName}>
                                    {section.name}
                            </Link>
                            <div className={styles.selectThemeWord__sectionWords}>
                                {section.words.slice(0, Math.ceil(section.words.length / 2)).map((word: any, i: number) => (
                                    <Link as={NavLink} to={`/dictionary/${themeId}/word/${word.id}`}>
                                        <Typography variant='p' className={styles.selectThemeWord__word} key={i}>{word.word}</Typography>
                                    </Link>
                                ))}
                            </div>
                            <div className={styles.selectThemeWord__sectionWords}>
                                {section.words.slice(Math.ceil(section.words.length / 2)).map((word: any, i: number) => (
                                    <Link as={NavLink} to={`/dictionary/${themeId}/word/${word.id}`}>
                                        <Typography variant='p' className={styles.selectThemeWord__word} key={i}>{word.word}</Typography>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </ScrollBox>
        </Card>
    )
})