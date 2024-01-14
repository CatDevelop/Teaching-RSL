import { typedMemo } from "core/utils/typedMemo";
import React, {FC, Suspense, useMemo, useState} from "react";
import { ComponentProps } from "core/models/ComponentProps";
import { Route, Routes } from "react-router-dom";
import { SelectUnit } from "./SelectUnit";
import { SelectThemeWord } from "./SelectThemeWord/SelectThemeWord";
import { SelectSectionWord } from "./SelectSectionWord";
import {SelectFoundWord} from "./SelectFoundWord";
import { Card } from "components/Card";
import styles from "./SelectWordBlock.module.css"
import { Spinner } from "@nextui-org/react";

type Props = ComponentProps & Readonly<{
    /**
     * Поиск по словам
     */
    search: string;

    /**
     * Выбрать слово
     * @param wordId id слова
     */
    selectWord: (wordId: string) => void;
}>

/**
 * Блок с выбором слова
 */
export const SelectWordBlock: FC<Props> = typedMemo(function SelectThemeDictionary(props){

    const trimmedSearch = useMemo(() => props.search.trim(), [props.search])

    if(trimmedSearch){
        return (
            <Card className={styles.selectWordBlock}>
                <Suspense fallback={<Spinner/>}>
                    <SelectFoundWord search={trimmedSearch} selectWord={props.selectWord}/>
                </Suspense>
            </Card>
        )
    }

    return (
        <Card className={styles.selectWordBlock}>
            <Suspense fallback={<Spinner/>}>
                <Routes>
                    <Route path="" element={<SelectUnit/>}/>
                    <Route path=":themeId">
                        <Route path="" element={<SelectThemeWord selectWord={props.selectWord}/>}/>
                        <Route path=":sectionId">
                            <Route path="" element={<SelectSectionWord selectWord={props.selectWord}/>}/>
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </Card>
    )
})
