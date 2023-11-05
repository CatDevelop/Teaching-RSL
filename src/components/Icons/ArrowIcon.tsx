import React, {FC, SVGProps} from "react";
import {typedMemo} from "../../core/utils/typedMemo";

export const ArrowIcon: FC<SVGProps<SVGSVGElement>> = typedMemo(function ArrowIcon(props){
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
            <path d="M9 5L16 12L9 19" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
})