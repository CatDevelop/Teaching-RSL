import React, {FC, SVGProps} from "react";
import {typedMemo} from "core/utils/typedMemo";

export const ArrowIcon: FC<SVGProps<SVGSVGElement>> = typedMemo(function ArrowIcon(props){
    return (
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"{...props}>
            <path d="M7.41 10.58L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.58Z" fill="#D4D4D8"/>
        </svg>
    )
})