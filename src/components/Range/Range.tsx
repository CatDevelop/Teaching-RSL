import React, {FC, useCallback, useEffect, useRef} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import {ComponentProps} from "../../core/models/ComponentProps";
import {Slider} from '@mantine/core';
import styles from "./Range.module.css";
import clsx from "clsx";

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

    useEffect(() => {
        if (rangeRef.current) {
            rangeRef.current.addEventListener("input", handleRangeChange);
        }
    }, [rangeRef, handleRangeChange]);

    return (
        // <div className={styles.range}>
        //     <span className={clsx(styles.range__limit, styles.range__min)}>
        //         {min}
        //     </span>
        //     <input
        //         ref={rangeRef}
        //         type="range"
        //         min={min}
        //         max={max}
        //         value={value}
        //         step="1"
        //         className={styles.range__input}
        //         onChange={onChange}
        //     />
        //     <span className={clsx(styles.range__limit, styles.range__max)}>
        //         {max}
        //     </span>
        // </div>
        <div className={styles.range}>
            <Slider
                color="blue"
                min={min}
                max={max}
                marks={[
                    {value: min, label: min},
                    {value: Math.round((min+max)/2), label: Math.round((min+max)/2)},
                    {value: max, label: max},
                ]}
            />
        </div>
    );
});
