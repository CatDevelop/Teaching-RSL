import { Card } from "components/Card";
import { typedMemo } from "core/utils/typedMemo";
import React, { FC } from "react";
import styles from "./DictionaryWordBlock.module.css";
import { Typography } from "components/Typography";
import { ComponentProps } from "core/models/ComponentProps";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { GetWordResponse } from "core/models/words/GetWordResponse";
import { WordsService } from "api/services/words";

type Props = ComponentProps & Readonly<{}>

export const DictionaryWordBlock: FC<Props> = typedMemo(function DictionaryWordBlock(props){
    const {wordId} = useParams<{wordId: string}>();
    const {data: word} = useQuery<GetWordResponse>(['word', wordId], () => WordsService.getWordById(wordId ?? ''), {
        onError: () => {},
        useErrorBoundary: false,
        retry: false,
    });

    if(!word){
        return (
            <Card className={clsx(styles.themeDictionary_empty, props.className)}>
                <Typography variant='p' className={styles.themeDictionary_empty__title}>Вы пока не выбрали слово</Typography>
            </Card>
        )
    }
    return (
        <Card className={clsx(props.className)}>
            {word.word}
        </Card>
    )
})