import {Card} from "components/Card";
import {typedMemo} from "core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./DictionaryWordBlock.module.css";
import {Typography} from "components/Typography";
import {ComponentProps} from "core/models/ComponentProps";
import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import {GetWordResponse} from "core/models/words/GetWordResponse";
import {WordsService} from "api/services/words";
import {Button} from "../../../../../components/Button";
import {UserTestStorageService} from "../../../../../api/services/userTestStorageService";
import {SignVideo} from "../../../../../components/SignVideo";

type Props = ComponentProps & Readonly<{
    /**
     * Id выбранного слова
     */
    selectedWordId: string | null;

    /**
     * Находиться ли выбранное слово в тесте
     */
    isWordInTest: boolean;
    setIsWordInTest: React.Dispatch<React.SetStateAction<boolean>>;
}>

export const DictionaryWordBlock: FC<Props> = typedMemo(function DictionaryWordBlock(props) {
    const navigate = useNavigate();

    const {data: word} = useQuery<GetWordResponse>(
        ['word', props.selectedWordId],
        () => WordsService.getWordById(props.selectedWordId ?? ''),
        {
            onError: () => {
            },
            useErrorBoundary: false,
            retry: false,
            refetchOnWindowFocus: false
        });

    const addWordToTest = useCallback(() => {
        props.selectedWordId && UserTestStorageService.addWord(props.selectedWordId);
        props.setIsWordInTest(true)
    }, [props.selectedWordId])

    const removeWordFromTest = useCallback(() => {
        props.selectedWordId && UserTestStorageService.deleteWord(props.selectedWordId);
        props.setIsWordInTest(false)
    }, [props.selectedWordId])

    useEffect(() => {
        props.selectedWordId && props.setIsWordInTest(UserTestStorageService.checkWordIdInStorage(props.selectedWordId))
    }, [props.selectedWordId, props.setIsWordInTest]);

    if (!word) {
        return (
            <Card className={clsx(styles.dictionaryWordBlock_empty, props.className)}>
                <Typography
                    variant='p' className={styles.dictionaryWordBlock_empty__title}>
                    Вы пока не <br/> выбрали слово
                </Typography>
            </Card>
        )
    }

    return (
        <Card className={clsx(props.className, styles.dictionaryWordBlock)}>
            <Typography variant="h3">{word.word}</Typography>
            <div className={styles.dictionaryWordBlock__imageContainer}>
                {word.illustrations[0].fileType === 'Jpeg' ?
                    <img src={word.illustrations[0]?.path ?? ''} className={styles.dictionaryWordBlock__image}/> :
                    <SignVideo src={word.illustrations[0]?.path} className={styles.dictionaryWordBlock__image}/>
                }
            </div>
            <div className={styles.dictionaryWordBlock__actions}>
                <Button
                    color="primary"
                    variant="solid"
                    onClick={() => navigate(`/dictionary/learning/${props.selectedWordId}`)}
                >
                    Потренироваться
                </Button>

                {
                    !props.isWordInTest ?
                        <Button variant="bordered" color="primary" onClick={addWordToTest}>Добавить в тест</Button> :
                        <Button variant="bordered" color="danger" onClick={removeWordFromTest}>Удалить из теста</Button>
                }
            </div>
        </Card>
    )
})
