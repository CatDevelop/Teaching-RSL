import React, {FC, useEffect, useState} from "react";
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
import {Button} from "../../../../components/Button";
import {ModelWarning} from "../../../training/components/ModelWarning/ModelWarning";
import {socket} from "../../../../core/utils/connectToModal";
import {SignVideo} from "../../../../components/SignVideo";

type Props = Readonly<{}>

/**
 * Попробуй жест в словаре
 */
export const DictionaryLearningPage: FC<Props> = typedMemo(function DictionaryLearningPage(props) {
    const {wordId} = useParams<{ wordId: string }>()
    const {data: word} = useQuery(['word-by-id', wordId], () => WordsService.getWordById(wordId ?? ''))
    const [intervalID, setIntervalID] = useState<TimeoutId>()
    const [signRecognizeText, setSignRecognizeText] = useState<string[]>([])
    const [isNotStartModel, setIsNotStartModel] = useState(false)
    const [isHintVisible, setIsHintVisible] = useState(false)

    useEffect(() => {
        socket.on('connect_error', () => setIsNotStartModel(true))
        socket.on('connect_failed', () => setIsNotStartModel(true))
        socket.on('connect', () => setIsNotStartModel(false))
    }, []);

    return (
        <Page>
            <SideBar/>
            <PageContent className={styles.dictionaryLearningPage}>
                {
                    !isNotStartModel &&
                    <RecognitionBlock
                        word={word!}
                        className={styles.dictionaryLearningPage__recognition}
                        onSuccess={() => {
                        }}
                        setIntervalID={setIntervalID}
                        intervalID={intervalID}
                        signRecognizeText={signRecognizeText}
                        setSignRecognizeText={setSignRecognizeText}
                        buttons={
                            <div className={styles.dictionaryLearningPage__buttons}>
                                {
                                    isHintVisible &&
                                    <>
                                        <div className={styles.dictionaryLearningPage__hint}>
                                            <SignVideo src={word?.illustrations[0].path || ""}/>
                                        </div>
                                        <Button
                                            color="primary"
                                            variant="bordered"
                                            onClick={() => setIsHintVisible(false)}
                                        >
                                            Hide sign
                                        </Button>
                                    </>
                                }
                                {
                                    !isHintVisible &&
                                    <Button
                                        color="primary"
                                        variant="bordered"
                                        onClick={() => setIsHintVisible(true)}
                                    >
                                        Show sign
                                    </Button>
                                }
                            </div>
                        }
                    />
                }
                {
                    isNotStartModel &&
                    <ModelWarning className={styles.trainingPage__warning}/>
                }
            </PageContent>
        </Page>
    )
})
