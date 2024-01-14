import {Card} from "components/Card";
import {ScrollBox} from "components/ScrollBox";
import {typedMemo} from "core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./SelectThemeWord.module.css";
import {Typography} from "components/Typography";
import {ComponentProps} from "core/models/ComponentProps";
import clsx from "clsx";
import {NavLink, useParams} from "react-router-dom";
import {Link} from "@nextui-org/react";
import {ArrowIcon} from "components/Icons";
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
export const SelectThemeWord: FC<Props> = typedMemo(function SelectThemeWord(props){
    const {themeId} = useParams<{themeId: string}>();
    const {data:themes} = useQuery(['words-list', themeId], () => WordsService.getWordsByBlock(BlockType.Theme, themeId ?? ''))

    return (
        <>
            <div className={styles.selectThemeWord__header}>
                <NavLink to={`/dictionary`}>
                    <ArrowIcon className={styles.selectThemeWord__backIcon}/>
                </NavLink>
                
                <Typography variant='h2'>{themes![0].name}</Typography>
            </div>
            
            <ScrollBox className={styles.selectThemeWord__scroll}>
                {
                    themes![0].units.map((unit, i) => (
                        <div key={i} className={styles.selectThemeWord__theme}>
                            <Link 
                                as={NavLink}
                                to={`/dictionary/${themeId}/${unit.id}`}
                                className={styles.selectThemeWord__sectionName}>
                                    {unit.name}
                            </Link>
                            <div className={styles.selectThemeWord__sectionWords}>
                                {unit.words?.slice(0, Math.ceil(unit.words?.length / 2)).map((word: any, i: number) => (
                                    <Typography
                                        variant='p'
                                        className={styles.selectThemeWord__word}
                                        onClick={() => props.selectWord(word.id)}
                                        key={i}
                                    >
                                        {word.word}
                                    </Typography>
                                ))}
                            </div>
                            <div className={styles.selectThemeWord__sectionWords}>
                                {unit.words?.slice(Math.ceil(unit.words?.length / 2)).map((word: any, i: number) => (
                                    <Typography
                                        variant='p'
                                        className={styles.selectThemeWord__word}
                                        onClick={() => props.selectWord(word.id)}
                                        key={i}
                                    >
                                        {word.word}
                                    </Typography>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </ScrollBox>
        </>
    )
})