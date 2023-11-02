import React, {FC} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import {Tabs, Tab} from "@nextui-org/react";

type Props = Readonly<{
    tabs: {title: string, key: string}[]
}>

export const Tabs: FC<Props> = typedMemo(function Tabs(props){
    return (
        <Tabs>
            {
                props.tabs
            }
        </Tabs>
    )
})