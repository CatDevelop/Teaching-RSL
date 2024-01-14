import React, {FC, useCallback, useEffect, useMemo, useRef} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import {ComponentProps} from "../../core/models/ComponentProps";
import {Slider} from '@mantine/core';
import styles from "./Range.module.css";

type Props = ComponentProps & Readonly<{
    onChange?: (value: number) => void;
    value?: number;
    min?: number;
    max?: number;
}>

/**
 * Выбор значения из промежутка
 */
export const Range: FC<Props> = typedMemo(function Range({
                                                             onChange,
                                                             value,
                                                             min = 10,
                                                             max = 50,
                                                         }) {
    const rangeRef = useRef<HTMLInputElement | null>(null);

    const handleRangeChange = useCallback((event: any) => {
        let target = event.target
        const min = target.min
        const max = target.max
        const val = target.value
        let percentage = (val - min) * 100 / (max - min)
        target.style.backgroundSize = percentage + '% 100%'
    }, []);

    const marks = useMemo(() => [{value: min, label: min}, {value: max, label: max}], [min, max])

    useEffect(() => {
        if (rangeRef.current) {
            rangeRef.current.addEventListener("input", handleRangeChange);
        }
    }, [rangeRef, handleRangeChange]);

    return (
        <div className={styles.range}>
            <Slider
                color="blue"
                min={min}
                max={max}
                onChange={onChange}
                marks={marks}
            />
        </div>
    );
});
