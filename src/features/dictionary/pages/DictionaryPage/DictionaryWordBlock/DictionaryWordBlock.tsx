import {Card} from "components/Card";
import {typedMemo} from "core/utils/typedMemo";
import React, {FC, useCallback} from "react";
import styles from "./DictionaryWordBlock.module.css";
import {Typography} from "components/Typography";
import {ComponentProps} from "core/models/ComponentProps";
import clsx from "clsx";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {GetWordResponse} from "core/models/words/GetWordResponse";
import {WordsService} from "api/services/words";
import {Button} from "../../../../../components/Button";
import {NavLink} from "@mantine/core";
import {UserTestStorageService} from "../../../../../api/services/userTestStorageService";

type Props = ComponentProps & Readonly<{
    /**
     * Id выбранного слова
     */
    selectedWordId: string | null;
}>

export const DictionaryWordBlock: FC<Props> = typedMemo(function DictionaryWordBlock(props) {
    const navigate = useNavigate();
    const {data: word} = useQuery<GetWordResponse>(
        ['word', props.selectedWordId],
        () => WordsService.getWordById(props.selectedWordId ?? ''),
        {
                onError: () => {},
                useErrorBoundary: false,
                retry: false,
        });

    const addWordToTest = useCallback(() => {
        props.selectedWordId && UserTestStorageService.addWord(props.selectedWordId);
    }, [props.selectedWordId])

    if (!word) {
        return (
            <Card className={clsx(styles.dictionaryWordBlock_empty, props.className)}>
                <Typography
                    variant='p'
                            className={styles.dictionaryWordBlock_empty__title}>
                    Вы пока не выбрали слово
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
                    <video src={word.illustrations[0]?.path ?? ''} className={styles.dictionaryWordBlock__image} autoPlay loop muted/>
                }
            </div>
            <div className={styles.dictionaryWordBlock__actions}>
                <Button color="primary" variant="solid" onClick={() => navigate(`/dictionary/learning/${props.selectedWordId}`)}>Потренироваться</Button>
                <Button variant="bordered" color="primary" onClick={addWordToTest}>Добавить в тест</Button>
            </div>
        </Card>
    )
})
