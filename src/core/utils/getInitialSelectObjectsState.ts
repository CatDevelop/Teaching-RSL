import {WordFormServer2} from "../models/Word";
import {SelectObjectState} from "../models/SelectState";

export const getInitialSelectObjectsState = (variants: WordFormServer2[]) => {
    return variants.map<SelectObjectState>(variant => (
        {
            wordObject: variant,
            state: "default"
        }
    ))
}
