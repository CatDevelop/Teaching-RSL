import { Card } from "components/Card";
import { ScrollBox } from "components/ScrollBox";
import { typedMemo } from "core/utils/typedMemo";
import React, {FC, useCallback} from "react";
import styles from "./SelectFoundWord.module.css";
import { Typography } from "components/Typography";
import { ComponentProps } from "core/models/ComponentProps";
import clsx from "clsx";
import { NavLink, useParams } from "react-router-dom";
import { Link } from "@nextui-org/react";
import {useQuery} from "react-query";
import {WordsService} from "../../../../../../api/services/words";

type Props = ComponentProps & Readonly<{
    /**
     * Поиск
     */
    search: string;
}>

/**
 * Выбрать слово из найденных
 */
export const SelectFoundWord: FC<Props> = typedMemo(function SelectFoundWord(props){
    const {data: words} = useQuery(['words/search', props.search], () => WordsService.getWordsBySearch(props.search))
    const {themeId, sectionId} = useParams<{themeId: string, sectionId: string}>();

    const getWordLink = useCallback((wordId: string) => {
        if(sectionId){
            return `/dictionary/${themeId}/${sectionId}/word/${wordId}`
        }
        if(themeId){
            return `/dictionary/${themeId}/word/${wordId}`
        }
        return `/dictionary/word/${wordId}`
    },[themeId, sectionId])

    console.log(words,words!.slice(0, Math.ceil(words!.length / 2)) )
    return (
        <Card className={clsx(props.className, styles.selectFoundWord)}>
            <div className={styles.selectFoundWord__header}>
                <Typography variant='h2'>Подходящие слова</Typography>
            </div>

            <ScrollBox className={styles.selectFoundWord__scroll}>
            <div className={styles.selectFoundWord__sectionWords}>
                {words!.slice(0, Math.ceil(words!.length / 2)).map((word: any, i: number) => (
                    <Link as={NavLink} to={getWordLink(word.id)}>
                        <Typography variant='p' className={styles.selectFoundWord__word} key={i}>{word.word}</Typography>
                    </Link>
                ))}
            </div>
            <div className={styles.selectFoundWord__sectionWords}>
                {words!.slice(Math.ceil(words!.length / 2)).map((word: any, i: number) => (
                    <Link as={NavLink} to={getWordLink(word.id)}>
                        <Typography variant='p' className={styles.selectFoundWord__word} key={i}>{word.word}</Typography>
                    </Link>
                ))}
            </div>
            </ScrollBox>
        </Card>
    )
})