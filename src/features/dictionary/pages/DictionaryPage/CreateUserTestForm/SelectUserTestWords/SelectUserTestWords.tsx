import React, {FC, useCallback, useEffect, useState} from "react";
import {typedMemo} from "core/utils/typedMemo";
import {UserTestStorageService} from "api/services/userTestStorageService";
import {SelectItemType} from "core/models/SelectItemType";
import {WordsService} from "api/services/words";
import styles from './SelectUserTestWords.module.css';
import {Typography} from "components/Typography";
import {useQuery} from "react-query";
import {OnChangeValue} from "react-select";
import {Select} from "components/Select";
import {normalizeCountForm} from "core/utils/normalizeCountForm";
import {useDebouncedState} from "../../../../../../core/hooks/useDebouncedState";

type Props = Readonly<{
    onChangeWordIds: (ids: string[]) => void;
}>

/**
 * Выбор слов для теста
 */
export const SelectUserTestWords: FC<Props> = typedMemo(function SelectUserTestWords(props) {
    const [search, setSearch] = useState('')
    const [debouncedSearch] = useDebouncedState(search)
    const [words, setWords] = useState<SelectItemType<string>[]>([])
    const rawWordsQuery = useQuery(
        ['get-words-in-test', debouncedSearch.trim()],
        () => WordsService.getWordsBySearch(debouncedSearch.trim()),
        {
            onSuccess: (words) => {
                setWords(words.map(word => new SelectItemType({label: word.word ?? '', value: word.id})))
            },
            suspense: false,
            enabled: debouncedSearch.trim().length > 0
        })

    const [selectedWords, setSelectedWords] = useState<SelectItemType<string>[]>([])

    const setInitialWords = useCallback(async () => {
        const words = UserTestStorageService.getWords().map(async id => {
            const word = await WordsService.getWordById(id);
            return new SelectItemType({label: word.word ?? '', value: word.id})
        })

        setSelectedWords(await Promise.all(words))
    }, []);

    const onChange = useCallback((selectedOptions: OnChangeValue<SelectItemType<string>, true>) => {
        UserTestStorageService.resetWords()

        selectedOptions.forEach(word => {
            UserTestStorageService.addWord(word.value)
        })

        setSelectedWords(selectedOptions as SelectItemType<string>[])
    }, []);

    useEffect(() => {
        setInitialWords()
    }, []);

    useEffect(() => {
        if (search.length === 0) {
            setWords([])
        }
    }, [search])

    useEffect(() => {
        props.onChangeWordIds(selectedWords.map(word => word.value))
    }, [selectedWords]);

    return (
        <div className={styles.selectUserTestWords}>
            <div className={styles.selectUserTestWords__header}>
                <Typography
                    variant="span"
                    className={styles.selectUserTestWords__title}
                >
                    Список слов
                </Typography>
                <Typography
                    variant="span"
                    className={styles.selectUserTestWords__wordCount}
                >
                    {selectedWords.length} {normalizeCountForm(selectedWords.length, ["слово", "слова", "слов"])}
                </Typography>
            </div>

            <Select<SelectItemType<string>, true>
                inputValue={search}
                onInputChange={setSearch}
                options={words}
                onChange={onChange}
                value={selectedWords}
                placeholder="Слова для теста"
                isMulti
                isSearchable
            />
        </div>
    )
})
