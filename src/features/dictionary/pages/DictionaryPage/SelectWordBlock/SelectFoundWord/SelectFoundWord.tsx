import {ScrollBox} from "components/ScrollBox";
import {typedMemo} from "core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./SelectFoundWord.module.css";
import {Typography} from "components/Typography";
import {ComponentProps} from "core/models/ComponentProps";
import {useQuery} from "react-query";
import {WordsService} from "../../../../../../api/services/words";

type Props = ComponentProps & Readonly<{
    /**
     * Поиск
     */
    search: string;

    /**
     * Выбрать слово
     * @param wordId id слова
     */
    selectWord: (wordId: string) => void;
}>

/**
 * Выбрать слово из найденных
 */
export const SelectFoundWord: FC<Props> = typedMemo(function SelectFoundWord(props) {
    const {data: words} = useQuery(['words/search', props.search], () => WordsService.getWordsBySearch(props.search))

    return (
        <>
            <div className={styles.selectFoundWord__header}>
                <Typography variant='h2'>Found words</Typography>
            </div>

            <ScrollBox className={styles.selectFoundWord__scroll}>
                {
                    words!.length === 0 &&
                    <Typography variant='p'>
                        Nothing found
                    </Typography>
                }
                { words!.length !== 0 && 
                    <>
                        <div className={styles.selectFoundWord__sectionWords}>
                            {words!.slice(0, Math.ceil(words!.length / 2)).map((word: any, i: number) => (
                                <Typography
                                    variant='p'
                                    className={styles.selectFoundWord__word}
                                    onClick={() => props.selectWord(word.id)}
                                    key={i}
                                >
                                    {word.word}
                                </Typography>
                            ))}
                        </div>
                        <div className={styles.selectFoundWord__sectionWords}>
                            {words!.slice(Math.ceil(words!.length / 2)).map((word: any, i: number) => (
                                <Typography
                                    variant='p'
                                    className={styles.selectFoundWord__word}
                                    onClick={() => props.selectWord(word.id)}
                                    key={i}
                                >
                                    {word.word}
                                </Typography>
                            ))}
                        </div>
                    </>
                }
            </ScrollBox>
        </>
    )
})
