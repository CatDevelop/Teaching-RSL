import React, {FC, useCallback, useEffect, useState} from "react";
import {typedMemo} from "../../../../../../core/utils/typedMemo";
import {UserTestStorageService} from "../../../../../../api/services/userTestStorageService";
import {SelectItemType} from "../../../../../../core/models/SelectItemType";
import {WordsService} from "../../../../../../api/services/words";
import styles from './SelectUserTestWords.module.css';
import {Typography} from "../../../../../../components/Typography";
import {Button, Chip} from "@nextui-org/react";
import clsx from "clsx";

type Props = Readonly<{
    onChangeWordIds: (ids: string[]) => void;
}>

/**
 * Выбор слов для теста
 */
export const SelectUserTestWords:FC<Props> = typedMemo(function SelectUserTestWords(props){
    const [words, setWords] = useState<SelectItemType<string>[]>([]);

    const setInitialWords = useCallback(async () => {
        const words = UserTestStorageService.getWords().map(async id => {
            const word = await WordsService.getWordById(id);
            return new SelectItemType({label: word.word ?? '', value: word.id})
        })

        setWords(await Promise.all(words))
    }, []);

    const deleteWord = useCallback((id: string) => {
        UserTestStorageService.deleteWord(id);
        setWords(words => words.filter(word => word.value !== id))
    }, [])

    const resetWords = useCallback(() => {
        setWords([])
        words.forEach(word => UserTestStorageService.deleteWord(word.value))
    }, [words])

    useEffect(() => {
        setInitialWords()
    }, [setInitialWords])

    useEffect(() => {
        props.onChangeWordIds(words.map(word => word.value));
    }, [words, props])

    return (
        <div className={clsx(styles.selectUserTestWords, 'shadow-sm border-default-200 border-medium rounded-medium py-2 px-3')}>
            <div className={styles.selectUserTestWords__header}>
               <div className={styles.selectUserTestWords__title}>
                   <Typography variant="span" className={styles.selectUserTestWords__listTitle}>Список слов</Typography>
                   <Typography variant="span" className={styles.selectUserTestWords__wordCount}>{words.length} слов</Typography>
               </div>

               <Button
                    color="primary"
                    variant="light"
                    onClick={resetWords}
                    className={styles.selectUserTestWords__resetButton}
                >
                Очистить список
                </Button>
            </div>
            <div className={styles.selectUserTestWords__words}>
                {
                    words.map(word => (
                        <Chip
                            key={word.value}
                            onClose={() => deleteWord(word.value)}
                            variant="bordered"
                            className={styles.selectUserTestWords__word}
                        >
                            {word.label}
                        </Chip>
                    ))
                }
            </div>
        </div>
    )
})
