import {Dispatch, SetStateAction, useEffect, useState} from "react";

/**
 * Хук для отложенного изменения состояния
 * @param value состояние
 * @param delay время задержки, default = 300ms
 */
export function useDebouncedState<TValue>(value: TValue, delay:number = 300): [TValue, Dispatch<SetStateAction<TValue>>]{
    const [debouncedValue, setDebouncedValue] = useState<TValue>(value)

    useEffect(() => {
        const delayValueTimeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(delayValueTimeoutId);
    }, [value, delay]);

    return [debouncedValue, setDebouncedValue]
}
