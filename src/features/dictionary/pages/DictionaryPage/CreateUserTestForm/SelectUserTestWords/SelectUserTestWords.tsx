import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {typedMemo} from "../../../../../../core/utils/typedMemo";
import {UserTestStorageService} from "../../../../../../api/services/userTestStorageService";
import {SelectItemType} from "../../../../../../core/models/SelectItemType";
import {WordsService} from "../../../../../../api/services/words";
import styles from './SelectUserTestWords.module.css';
import {Typography} from "../../../../../../components/Typography";

type Props = Readonly<{}>

const wordsIds = UserTestStorageService.getWords();

export const SelectUserTestWords:FC<Props>= typedMemo(function SelectUserTestWords(props){
    const [words, setWords] = useState<SelectItemType<string>[]>([]);

    const getWords = useCallback(async (): Promise<SelectItemType<string>[]> => {
        return wordsIds.map(async id => {
            const word = await WordsService.getWordById(id);
            return new SelectItemType({label: word.word, value: word.id})
        })
    }, []);

    const deleteWords = useCallback((id: string) => {
        setWords(words => words.filter(word => word.value !== id))
    }, [])

    useEffect(() => {
        setWords(async () => await getWords())
    })

    return (
        <div className={styles.selectUserTestWords}>
            <div className={styles.selectUserTestWords__header}>
               <div className={styles.selectUserTestWords__title}>
                   <Typography variant="span">Список слов</Typography>
               </div>
            </div>
        </div>
    )
})