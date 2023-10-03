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

    const initialWordState: SelectObjectState[] = [...variantsInOtherOrder.map<SelectObjectState>(variant => {
        return {wordObject: variant, state: "default"}
    })]

    const initialGIFState: SelectObjectState[] = [...props.variants.map<SelectObjectState>(variant => {
        return {wordObject: variant, state: "default"}
    })]

    const [wordsState, setWordsState] = useState<SelectObjectState[]>([...initialWordState])
    const [gifsState, setGIFsState] = useState<SelectObjectState[]>([...initialGIFState])
    const [isBlocked, setIsBlocked] = useState<boolean>(false)
    const [countOfCompleted, setCountOfCompleted] = useState(0)

    // TODO Скорее всего изменю алгоритм для проверки данного задания
    const handleClickOnSelectObject = (clickWordObject: Word, selectObjectState: SelectObjectState[], setSelectObjectState: React.Dispatch<React.SetStateAction<SelectObjectState[]>>) => {
        const toDefaultState: () => { wordObject: Readonly<Word>; state: SelectState }[] = () =>
            selectObjectState.map(objectInState => ({wordObject: objectInState.wordObject, state: objectInState.state === "success" ? "success" : "default"}))

        if (!isBlocked) {
            if (clickWordObject) {
                toDefaultState()
                let objectIdInState = selectObjectState.findIndex(word => word.wordObject.id === clickWordObject.id)
                if (selectObjectState[objectIdInState].state === "default")
                    setSelectObjectState(toDefaultState().with(objectIdInState, {wordObject: selectObjectState[objectIdInState].wordObject, state: "checked"}))
            } else {
                setSelectObjectState(toDefaultState())
            }
        }
    }

    useEffect(() => {
        if (wordsState.some(wordInState => wordInState.state === "checked")
            && gifsState.some(gifInState => gifInState.state === "checked")) {
            let checkedWordId = wordsState.findIndex(word => word.state === "checked")
            let checkedGIFId = gifsState.findIndex(gif => gif.state === "checked")
            setIsBlocked(true)
            let newState: SelectState;
            if (wordsState[checkedWordId].wordObject.id === gifsState[checkedGIFId].wordObject.id) {
                newState = "success"
                setCountOfCompleted(countOfCompleted+1)
                setIsBlocked(false)
            } else {
                newState = "error"
                setTimeout(() => {
                    setWordsState(wordsState.with(checkedWordId, {wordObject: wordsState[checkedWordId].wordObject, state: "default"}))
                    setGIFsState(gifsState.with(checkedGIFId, {wordObject: gifsState[checkedGIFId].wordObject, state: "default"}))
                    setIsBlocked(false)
                }, 1000)
            }


            setWordsState(wordsState.with(checkedWordId, {wordObject: wordsState[checkedWordId].wordObject, state: newState}))
            setGIFsState(gifsState.with(checkedGIFId, {wordObject: gifsState[checkedGIFId].wordObject, state: newState}))
        }
        if(countOfCompleted === 3)
        {
            props.setIsTaskReadyToCheck(true)
            props.setStatus({status: "success"})
        }

    }, [wordsState, gifsState])

    return (
        <div className={clsx(styles.practiceMatchWordAndGIF)}>
            <LearningBlock iconUrl={PracticeIconSVG} title={"Практика"}>
                <div className={styles.practiceSelectGif__contentContainer}>
                    <div className={styles.practiceSelectGif__titleContainer}>
                        <Typography variant="h3" className={styles.practiceMatchWordAndGIF__title}>
                            Подбери пару к словам
                        </Typography>
                    </div>

                    <div className={styles.practiceMatchWordAndGIF__taskContainer}>
                        <div className={styles.practiceMatchWordAndGIF__taskContainer_buttons}>
                            {
                                wordsState.map(word => {
                                    return <SelectButton
                                        state={word.state}
                                        wordObject={word.wordObject}
                                        setState={(clickWordObject) => handleClickOnSelectObject(clickWordObject, wordsState, setWordsState)}/>
                                })
                            }
                        </div>
                        <div className={styles.practiceMatchWordAndGIF__taskContainer_gifs}>
                            {
                                gifsState.map((gif, index) => {
                                    return <SelectGIF wordObject={gif.wordObject}
                                                      state={gif.state}
                                                      setState={(clickWordObject) => handleClickOnSelectObject(clickWordObject, gifsState, setGIFsState)}
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
