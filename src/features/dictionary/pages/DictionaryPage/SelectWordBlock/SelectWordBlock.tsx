import { typedMemo } from "core/utils/typedMemo";
import React, { FC } from "react";
import { ComponentProps } from "core/models/ComponentProps";
import { Route, Routes } from "react-router-dom";
import { SelectUnit } from "./SelectUnit";

type Props = ComponentProps & Readonly<{
    themes: any[];
}>

export const SelectWordBlock: FC<Props> = typedMemo(function SelectThemeDictionary(props){
    return (
        <Routes>
            <Route path="" element={<SelectUnit themes={props.themes}/>}/>
            <Route path=":themeId" element={<SelectUnit themes={props.themes}/>}>
                <Route path="" element={<SelectUnit themes={props.themes}/>}/>
                <Route path="word" element={<SelectUnit themes={props.themes}/>}/>
                <Route path=":sectionId" element={<SelectUnit themes={props.themes}/>}/>
            </Route>
        </Routes>
    )
})