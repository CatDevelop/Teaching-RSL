import React, { FC, useCallback, useEffect, useRef } from "react";
import { typedMemo } from "../../core/utils/typedMemo";
import { ComponentProps } from "../../core/models/ComponentProps";
import styles from "./Range.module.css";

type Props = ComponentProps & Readonly<{
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: number;
    min?: number;
    max?: number;
}>

/** Range input. */
export const Range: FC<Props> = typedMemo(function Range({
    onChange,
    value,
    min = 0,
    max = 100,
}){
    const rangeRef = useRef<HTMLInputElement | null>(null);

    const handleRangeChange = useCallback((event: any) => {
            let target = event.target
            const min = target.min
            const max = target.max
            const val = target.value
            let percentage = (val - min) * 100 / (max - min)
            target.style.backgroundSize = percentage + '% 100%'
    }, []);

    useEffect(() => {
        if(rangeRef.current){
            rangeRef.current.addEventListener("input", handleRangeChange);
        }
    }, [rangeRef, handleRangeChange]);

    return (
        <input
            ref={rangeRef}
            type="range"
            min={min}
            max={max}
            value={value}
            step="1"
            className={styles.range}
            onChange={onChange}
        />
    );
});
