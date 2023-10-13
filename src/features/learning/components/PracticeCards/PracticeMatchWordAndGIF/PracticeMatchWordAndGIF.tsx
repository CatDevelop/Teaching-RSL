import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./PracticeMatchWordAndGIF.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import PracticeIconSVG from "../../../../../assets/images/PracticeIcon.svg"
import {LearningBlock} from "../../LearningBlock";
import {Word} from "../../../../../core/models/Word";
import {Typography} from "../../../../../components/Typography";
import {SelectGIF} from "../../SelectEntity/SelectGIF";
import {SelectButton} from "../../SelectEntity/SelectButton";
import {SelectObjectState, SelectState} from "../../../../../core/models/SelectState";
import {shuffleArray} from "../../../../../core/utils/shuffleArray";
import {StepStatus} from "../../../../../core/models/StepStatus";
import {getInitialSelectObjectsState} from "../../../../../core/utils/getInitialSelectObjectsState";

type handleClickOnSelectObject = (
    clickWordObject: Word,
    selectObjectState: SelectObjectState[],
    setSelectObjectState: React.Dispatch<React.SetStateAction<SelectObjectState[]>>
) => void

type Props = ComponentProps & Readonly<{
    variants: Word[];
    setStatus: React.Dispatch<React.SetStateAction<StepStatus>>;
    setIsTaskReadyToCheck: React.Dispatch<React.SetStateAction<boolean>>;
}>

type toDefaultStateType = () => { wordObject: Readonly<Word>; state: SelectState }[]


/** Практика "Подбери пару к словам". */
export const PracticeMatchWordAndGIF: FC<Props> = typedMemo(function PracticeMatchWordAndGIF(props) {
    const [variantsInOtherOrder] = useState(shuffleArray(props.variants))

    const [words, setWords] = useState<SelectObjectState[]>(getInitialSelectObjectsState(variantsInOtherOrder))
    const [gifs, setGifs] = useState<SelectObjectState[]>(getInitialSelectObjectsState(props.variants))
    const [isBlocked, setIsBlocked] = useState<boolean>(false)
    const [countOfCompleted, setCountOfCompleted] = useState(0)

    const handleClickOnSelectObject: handleClickOnSelectObject = useCallback((clickWordObject, selectObjectState, setSelectObjectState) => {
        const toDefaultState: toDefaultStateType = () => {
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
    }, [isBlocked])

    const checkStatusOfSelectedPair = () => {
        if (words.some(word => word.state === "checked")
            && gifs.some(gif => gif.state === "checked")) {
            let checkedWordIndex = words.findIndex(word => word.state === "checked")
            let checkedGIFIndex = gifs.findIndex(gif => gif.state === "checked")

            setIsBlocked(true)
            let newState: SelectState;
            if (words[checkedWordIndex].wordObject.id === gifs[checkedGIFIndex].wordObject.id) {
                newState = "success"
                setCountOfCompleted(countOfCompleted + 1)
                setIsBlocked(false)
            } else {
                newState = "error"
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
            }

            setWords(words.with(checkedWordIndex, {
                wordObject: words[checkedWordIndex].wordObject,
                state: newState
            }))
            setGifs(gifs.with(checkedGIFIndex, {
                wordObject: gifs[checkedGIFIndex].wordObject,
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
