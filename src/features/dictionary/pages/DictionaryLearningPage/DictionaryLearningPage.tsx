import React, {FC, useState} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {PageContent} from "../../../../components/PageContent";
import styles from "./DictionaryLearningPage.module.css";
import {RecognitionBlock} from "../../../training/components/RecognitionBlock";
import {Page} from "../../../../components/Page";
import {SideBar} from "../../../../components/SideBar";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {WordsService} from "../../../../api/services/words";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";

type Props = Readonly<{}>

export const DictionaryLearningPage: FC<Props> = typedMemo(function DictionaryLearningPage(props){
    const {wordId} = useParams<{wordId: string}>()
    const {data: word} = useQuery(['word-by-id', wordId], () => WordsService.getWordById(wordId ?? ''))
    const [intervalID, setIntervalID] = useState<TimeoutId>()
    const [signRecognizeText, setSignRecognizeText] = useState<string[]>([])

    return (
        <Page>
            <SideBar/>
            <PageContent className={styles.dictionaryLearningPage}>
                <RecognitionBlock
                    word={word!}
                    className={styles.dictionaryLearningPage__recognition}
                    onSuccess={() => {}}
                    setIntervalID={setIntervalID}
                    intervalID={intervalID}
                    signRecognizeText={signRecognizeText}
                    setSignRecognizeText={setSignRecognizeText}
                />
            </PageContent>
        </Page>
    )
})