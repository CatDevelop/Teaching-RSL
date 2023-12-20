import {useCallback} from "react";
import {WordFormServer} from "../models/Word";
import {SelectObjectState} from "../models/SelectState";

export const getInitialSelectObjectsState = (variants: WordFormServer[]) => {
    return variants.map<SelectObjectState>(variant => (
        {
            wordObject: variant,
            state: "default"
        }
    ))
}
