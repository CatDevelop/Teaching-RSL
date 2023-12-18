import { typedMemo } from "core/utils/typedMemo";
import React, {FC, useMemo} from "react";
import { ComponentProps } from "core/models/ComponentProps";
import { Route, Routes } from "react-router-dom";
import { SelectUnit } from "./SelectUnit";
import { SelectThemeWord } from "./SelectThemeWord/SelectThemeWord";
import { SelectSectionWord } from "./SelectSectionWord";
import {SelectFoundWord} from "./SelectFoundWord";

type Props = ComponentProps & Readonly<{
    /**
     * Темы со словами
     */
    themes: any[];

    /**
     * Поиск по словам
     */
    search: string;
}>

/**
 * Блок с выбором слова
 */
export const SelectWordBlock: FC<Props> = typedMemo(function SelectThemeDictionary(props){
    const trimmedSearch = useMemo(() => props.search.trim(), [props.search])
    console.log(trimmedSearch)

    if(trimmedSearch){
        return <SelectFoundWord search={trimmedSearch}/>
    }
    return (
        <Routes>
            <Route path="" element={<SelectUnit themes={props.themes}/>}/>
            <Route path="word/:wordId" element={<SelectUnit themes={props.themes}/>}/>
            <Route path=":themeId">
                <Route path="" element={<SelectThemeWord themes={props.themes}/>}/>
                <Route path="word/:wordId" element={<SelectThemeWord themes={props.themes}/>}/>
                <Route path=":sectionId">
                    <Route path="" element={<SelectSectionWord themes={props.themes}/>}/>
                    <Route path="word/:wordId" element={<SelectSectionWord themes={props.themes}/>}/>
                </Route>
            </Route>
        </Routes>
    )
})