import { typedMemo } from "core/utils/typedMemo";
import React, { FC } from "react";
import { ComponentProps } from "core/models/ComponentProps";
import { Route, Routes } from "react-router-dom";
import { SelectUnit } from "./SelectUnit";
import { SelectThemeWord } from "./SelectThemeWord/SelectThemeWord";
import { SelectSectionWord } from "./SelectSectionWord";

type Props = ComponentProps & Readonly<{
    themes: any[];
}>

export const SelectWordBlock: FC<Props> = typedMemo(function SelectThemeDictionary(props){
    return (
        <Routes>
            <Route path="" element={<SelectUnit themes={props.themes}/>}/>
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