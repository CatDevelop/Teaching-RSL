import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC, useEffect, useState} from "react";
import styles from "./PracticeMatchWordAndGIF.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import PracticeIconSVG from "../../../../../assets/images/PracticeIcon.svg"
import {LearningBlock} from "../../LearningBlock";
import {Word} from "../../../../../core/models/Word";
import {Typography} from "../../../../../components/Typography";
import {SelectGIF} from "../../SelectEntity/SelectGIF";
import {SelectButton} from "../../SelectEntity/SelectButton";
import {SelectState} from "../../../../../core/models/SelectState";
import {shuffleArray} from "../../../../../core/utils/shuffleArray";
import {StepStatus} from "../../../../../core/models/StepStatus";


type SelectObjectState = {
    wordObject: Readonly<Word>;
    state: SelectState;
}

type Props = ComponentProps & Readonly<{
    variants: Word[];
    setStatus: React.Dispatch<React.SetStateAction<StepStatus>>;
    setIsTaskReadyToCheck: React.Dispatch<React.SetStateAction<boolean>>;
}>

/** Практика "Подбери пару к словам". */
export const PracticeMatchWordAndGIF: FC<Props> = typedMemo(function PracticeMatchWordAndGIF(props) {
    const [variantsInOtherOrder] = useState(shuffleArray(props.variants))

    const getInitialSelectObjectsState = (variants: Word[]) => {
        return variants.map<SelectObjectState>(variant => {
            return {
                wordObject: variant,
                state: "default"
            }
        })
    }

    const [words, setWords] = useState<SelectObjectState[]>(getInitialSelectObjectsState(variantsInOtherOrder))
    const [gifs, setGifs] = useState<SelectObjectState[]>(getInitialSelectObjectsState(props.variants))
    const [isBlocked, setIsBlocked] = useState<boolean>(false)
    const [countOfCompleted, setCountOfCompleted] = useState(0)

    // TODO Скорее всего изменю алгоритм для проверки данного задания
    const handleClickOnSelectObject = (clickWordObject: Word, selectObjectState: SelectObjectState[], setSelectObjectState: React.Dispatch<React.SetStateAction<SelectObjectState[]>>) => {
        const toDefaultState: () => { wordObject: Readonly<Word>; state: SelectState }[] = () =>
            selectObjectState.map(objectInState => ({
                wordObject: objectInState.wordObject,
                state: objectInState.state === "success" ? "success" : "default"
            }))

        if (isBlocked)
            return;

        if (clickWordObject) {
            toDefaultState()
            let objectIndexInState = selectObjectState.findIndex(word => word.wordObject.id === clickWordObject.id)
            if (selectObjectState[objectIndexInState].state === "default")
                setSelectObjectState(toDefaultState().with(objectIndexInState, {
                    wordObject: selectObjectState[objectIndexInState].wordObject,
                    state: "checked"
                }))
        } else
            setSelectObjectState(toDefaultState())
    }

    const checkStatusOfSelectedPair = () => {
        if (words.some(wordInState => wordInState.state === "checked")
            && gifs.some(gifInState => gifInState.state === "checked")) {
            let checkedWordId = words.findIndex(word => word.state === "checked")
            let checkedGIFId = gifs.findIndex(gif => gif.state === "checked")
            setIsBlocked(true)
            let newState: SelectState;
            if (words[checkedWordId].wordObject.id === gifs[checkedGIFId].wordObject.id) {
                newState = "success"
                setCountOfCompleted(countOfCompleted + 1)
                setIsBlocked(false)
            } else {
                newState = "error"
                setTimeout(() => {
                    setWords(words.with(checkedWordId, {
                        wordObject: words[checkedWordId].wordObject,
                        state: "default"
                    }))
                    setGifs(gifs.with(checkedGIFId, {
                        wordObject: gifs[checkedGIFId].wordObject,
                        state: "default"
                    }))
                    setIsBlocked(false)
                }, 1000)
            }

            setWords(words.with(checkedWordId, {
                wordObject: words[checkedWordId].wordObject,
                state: newState
            }))
            setGifs(gifs.with(checkedGIFId, {
                wordObject: gifs[checkedGIFId].wordObject,
                state: newState
            }))
        }
    }

    const checkTaskStatus = () => {
        if (countOfCompleted === 3) {
            props.setIsTaskReadyToCheck(true)
            props.setStatus({status: "success"})
        }
    }

    useEffect(() => {
        checkStatusOfSelectedPair()
        checkTaskStatus()
    }, [words, gifs])

    return (
        <div className={clsx(styles.practiceMatchWordAndGIF)}>
            <LearningBlock iconUrl={PracticeIconSVG} title={"Практика"}>
                <div className={styles.practiceMatchWordAndGIF__contentContainer}>
                    <div className={styles.practiceMatchWordAndGIF__titleContainer}>
                        <Typography variant="h3" className={styles.practiceMatchWordAndGIF__title}>
                            Подбери пару к словам
                        </Typography>
                    </div>

                    <div className={styles.practiceMatchWordAndGIF__taskContainer}>
                        <div className={styles.practiceMatchWordAndGIF__taskContainer_buttons}>
                            {
                                words.map(word => {
                                    return <SelectButton
                                        className={styles.practiceMatchWordAndGIF__taskContainer__button}
                                        state={word.state}
                                        wordObject={word.wordObject}
                                        setState={(clickWordObject) => handleClickOnSelectObject(clickWordObject, words, setWords)}/>
                                })
                            }
                        </div>
                        <div className={styles.practiceMatchWordAndGIF__taskContainer_gifs}>
                            {
                                gifs.map((gif, index) => {
                                    return <SelectGIF wordObject={gif.wordObject}
                                                      state={gif.state}
                                                      setState={(clickWordObject) => handleClickOnSelectObject(clickWordObject, gifs, setGifs)}
                                                      number={index + 1}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </LearningBlock>
        </div>
    );
});
