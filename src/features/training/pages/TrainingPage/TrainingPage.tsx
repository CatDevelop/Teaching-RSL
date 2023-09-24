import { typedMemo } from "../../../../core/utils/typedMemo";
import React, { FC } from "react";
import { RecognitionBlock } from "./components/RecognitionBlock";

export const TrainingPage: FC = typedMemo(function TrainingPage(props){
    return (
        <RecognitionBlock text="dawdaw" />
    );
})