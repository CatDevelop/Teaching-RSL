import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./PracticeMatchWordAndGIF.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import {LearningBlock} from "../../LearningBlock";
import {WordFormServer2} from "../../../../../core/models/Word";
import {SelectGIF} from "../../SelectEntity/SelectGIF";
import {SelectButton} from "../../SelectEntity/SelectButton";
import {SelectObjectState, SelectState} from "../../../../../core/models/SelectState";
import {shuffleArray} from "../../../../../core/utils/shuffleArray";
import {StepStatus} from "../../../../../core/models/StepStatus";
import {getInitialSelectObjectsState} from "../../../../../core/utils/getInitialSelectObjectsState";

type HandleClickOnSelectObject = (
    clickWordObject: WordFormServer2,
    selectObjectState: SelectObjectState[],
    setSelectObjectState: React.Dispatch<React.SetStateAction<SelectObjectState[]>>
) => void

type ToDefaultStateType = () => {
    wordObject: Readonly<WordFormServer2>;
    state: SelectState
}[]

type OnWrongAnswer = (checkedWordIndex: number, checkedGIFIndex: number) => void
type GetNewStatusMatchPractice = (checkedWordIndex: number, checkedGIFIndex: number) => SelectState

type Props = ComponentProps & Readonly<{
    variants: WordFormServer2[];
    setStatus: React.Dispatch<React.SetStateAction<StepStatus>>;
    setIsTaskReadyToCheck: React.Dispatch<React.SetStateAction<boolean>>;
    setTaskChecked: React.Dispatch<React.SetStateAction<boolean>>;
}>


/**
 * Практика "Подбери пару к словам"
 */
export const PracticeMatchWordAndGIF: FC<Props> = typedMemo(function PracticeMatchWordAndGIF(props) {
    const [variantsInOtherOrder, setVariantsInOtherOrder] = useState(shuffleArray<WordFormServer2>(props.variants))

    const [words, setWords] = useState<SelectObjectState[]>(getInitialSelectObjectsState(variantsInOtherOrder))
    const [gifs, setGifs] = useState<SelectObjectState[]>(getInitialSelectObjectsState(props.variants))
    const [isBlocked, setIsBlocked] = useState<boolean>(false)
    const [countOfCompleted, setCountOfCompleted] = useState(0)

    useEffect(() => {
        setVariantsInOtherOrder(shuffleArray<WordFormServer2>(props.variants))
        setGifs(getInitialSelectObjectsState(props.variants))
    }, [props.variants]);

    useEffect(() => {
        setCountOfCompleted(0)
        setIsBlocked(false)
        setWords(getInitialSelectObjectsState(variantsInOtherOrder))
        props.setIsTaskReadyToCheck(false)
        props.setStatus({status: "default"})
        props.setTaskChecked(false)
    }, [variantsInOtherOrder]);

    const handleClickOnSelectObject: HandleClickOnSelectObject = useCallback((clickWordObject, selectObjectState, setSelectObjectState) => {
        const toDefaultState: ToDefaultStateType = () => {
            return selectObjectState.map(objectInState => ({
                wordObject: objectInState.wordObject,
                state: objectInState.state === "success" ? "success" : "default"
            }))
        }

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
    }, [props.variants, isBlocked])

    const onRightAnswer: () => void = useCallback(() => {
        setCountOfCompleted(countOfCompleted + 1)
        setIsBlocked(false)
    },[setCountOfCompleted, setIsBlocked, countOfCompleted])

    const onWrongAnswer: OnWrongAnswer = useCallback((checkedWordIndex, checkedGIFIndex) => {
        setTimeout(() => {
            setWords(words.with(checkedWordIndex, {
                wordObject: words[checkedWordIndex].wordObject,
                state: "default"
            }))
            setGifs(gifs.with(checkedGIFIndex, {
                wordObject: gifs[checkedGIFIndex].wordObject,
                state: "default"
            }))
            setIsBlocked(false)
        }, 1000)
    },[words, gifs, setIsBlocked, setGifs, setWords])

    const getNewStatusMatchPractice: GetNewStatusMatchPractice = useCallback(
        (checkedWordIndex, checkedGIFIndex) => {
            return words[checkedWordIndex].wordObject.id === gifs[checkedGIFIndex].wordObject.id
                ? "success"
                : "error"
        },
        [words, gifs]
    )

    const checkStatusOfSelectedPair = useCallback(() => {
        if (words.some(word => word.state === "checked")
            && gifs.some(gif => gif.state === "checked")) {
            let checkedWordIndex = words.findIndex(word => word.state === "checked")
            let checkedGIFIndex = gifs.findIndex(gif => gif.state === "checked")

            setIsBlocked(true)
            let newState: SelectState = getNewStatusMatchPractice(checkedWordIndex, checkedGIFIndex);

            if(newState === "success")
                onRightAnswer()
            else
                onWrongAnswer(checkedWordIndex, checkedGIFIndex)

            setWords(words.with(checkedWordIndex, {
                wordObject: words[checkedWordIndex].wordObject,
                state: newState
            }))
            setGifs(gifs.with(checkedGIFIndex, {
                wordObject: gifs[checkedGIFIndex].wordObject,
                state: newState
            }))
        }
    }, [words, gifs, setIsBlocked, setWords, setGifs, getNewStatusMatchPractice]);

    const checkTaskStatus = useCallback(() => {
        if (countOfCompleted >= 4) {
            props.setIsTaskReadyToCheck(true)
            props.setStatus({status: "success"})
            props.setTaskChecked(true)
        } else {
            props.setIsTaskReadyToCheck(false)
            props.setStatus({status: "default"})
            props.setTaskChecked(false)
        }
    }, [props.setIsTaskReadyToCheck, props.setStatus, countOfCompleted, props.setTaskChecked])

    useEffect(() => {
        checkStatusOfSelectedPair()
        checkTaskStatus()
    }, [words, gifs, checkStatusOfSelectedPair, checkTaskStatus])

    return (
        <div className={clsx(styles.practiceMatchWordAndGIF)}>
            <LearningBlock title={"Соотнесите слова и жесты"} className={styles.practiceMatchWordAndGIF__card}>
                <div className={styles.practiceMatchWordAndGIF__contentContainer}>
                    <div className={styles.practiceMatchWordAndGIF__taskContainer}>
                        <div className={styles.practiceMatchWordAndGIF__taskContainer_buttons}>
                            {
                                words.map(word => {
                                    return <SelectButton
                                        className={styles.practiceMatchWordAndGIF__taskContainer__button}
                                        state={word.state}
                                        wordObject={word.wordObject}
                                        setState={(clickWordObject) => handleClickOnSelectObject(clickWordObject, words, setWords)}
                                    />
                                })
                            }
                        </div>
                        <div className={styles.practiceMatchWordAndGIF__taskContainer_gifs}>
                            {
                                gifs.map((gif, index) => {
                                    return <SelectGIF
                                        wordObject={gif.wordObject}
                                        state={gif.state}
                                        setState={(clickWordObject) => handleClickOnSelectObject(clickWordObject, gifs, setGifs)}
                                        number={index + 1}
                                    />
                                })
                            }
                        </div>
                    </div>
                </div>
            </LearningBlock>
        </div>
    );
});
