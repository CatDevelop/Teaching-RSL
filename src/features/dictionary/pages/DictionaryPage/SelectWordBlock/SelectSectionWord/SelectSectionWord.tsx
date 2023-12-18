import { Card } from "components/Card";
import { ScrollBox } from "components/ScrollBox";
import { typedMemo } from "core/utils/typedMemo";
import React, { FC, useMemo } from "react";
import styles from "./SelectSectionWord.module.css";
import { Typography } from "components/Typography";
import { ComponentProps } from "core/models/ComponentProps";
import clsx from "clsx";
import { NavLink, useParams } from "react-router-dom";
import { Link } from "@nextui-org/react";
import { ArrowIcon } from "components/Icons";

type Props = ComponentProps & Readonly<{
    /**
     * Темы со словами
     */
    themes: any[];

    /**
     * Выбрать слово
     * @param wordId id слова
     */
    selectWord: (wordId: string) => void;
}>

/**
 * Выбрать слово из темы
 */
export const SelectSectionWord: FC<Props> = typedMemo(function SelectSectionWord(props){
    const {themeId, sectionId} = useParams<{themeId: string, sectionId: string}>();
    const theme = useMemo(() => props.themes.find(theme => theme.id === themeId), [themeId, props.themes]);
    const section = useMemo(() => theme?.sections.find((section: any) => section.id === sectionId), [sectionId, theme]);

    return (
        <Card className={clsx(props.className)}>
            <div className={styles.selectSectionWord__header}>
                <NavLink to={`/dictionary/${themeId}`}>
                    <ArrowIcon className={styles.selectSectionWord__backIcon}/>
                </NavLink>
                
                <Typography variant='h2'>{theme.name}: {section.name}</Typography>
            </div>

            <ScrollBox className={styles.selectSectionWord__scroll}>
            <div className={styles.selectSectionWord__sectionWords}>
                {section.words.slice(0, Math.ceil(section.words.length / 2)).map((word: any, i: number) => (
                    <Typography
                        variant='p'
                        className={styles.selectSectionWord__word}
                        onClick={() => props.selectWord(word.id)}
                        key={i}
                    >
                        {word.word}
                    </Typography>
                ))}
            </div>
            <div className={styles.selectSectionWord__sectionWords}>
                {section.words.slice(Math.ceil(section.words.length / 2)).map((word: any, i: number) => (
                    <Typography
                        variant='p'
                        className={styles.selectSectionWord__word}
                        onClick={() => props.selectWord(word.id)}
                        key={i}
                    >
                        {word.word}
                    </Typography>
                ))}
            </div>
            </ScrollBox>
        </Card>
    )
})