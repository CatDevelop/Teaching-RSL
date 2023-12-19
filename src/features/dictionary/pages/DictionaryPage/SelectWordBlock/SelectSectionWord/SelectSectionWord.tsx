import { Card } from "components/Card";
import { ScrollBox } from "components/ScrollBox";
import { typedMemo } from "core/utils/typedMemo";
import React, { FC } from "react";
import styles from "./SelectSectionWord.module.css";
import { Typography } from "components/Typography";
import { ComponentProps } from "core/models/ComponentProps";
import clsx from "clsx";
import { NavLink, useParams } from "react-router-dom";
import { ArrowIcon } from "components/Icons";
import {useQuery} from "react-query";
import {WordsService} from "../../../../../../api/services/words";
import {BlockType} from "../../../../../../core/models/words/BlockType";

type Props = ComponentProps & Readonly<{
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
    const {data: section} = useQuery(['words-list', themeId, sectionId], () => WordsService.getWordsByBlock(BlockType.Unit, sectionId ?? ''))

    return (
        <Card className={clsx(props.className, styles.selectSectionWord)}>
            <div className={styles.selectSectionWord__header}>
                <NavLink to={`/dictionary/${themeId}`}>
                    <ArrowIcon className={styles.selectSectionWord__backIcon}/>
                </NavLink>
                
                <Typography variant='h2'>{section!.name}</Typography>
            </div>

            <ScrollBox className={styles.selectSectionWord__scroll}>
            <div className={styles.selectSectionWord__sectionWords}>
                {section!.words.slice(0, Math.ceil(section!.words.length / 2)).map((word: any, i: number) => (
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
                {section!.words.slice(Math.ceil(section!.words.length / 2)).map((word: any, i: number) => (
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