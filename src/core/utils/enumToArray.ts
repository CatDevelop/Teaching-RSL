type NonFunctional<T> = T extends Function ? never : T;

/**
 * Метод для преобразования енума в массив
 * @param enumeration Енум
 */
export function enumToArray<T extends Record<string, unknown>>(enumeration: T): NonFunctional<T[keyof T]>[] {
    return Object.keys(enumeration)
        .filter(key => isNaN(Number(key)))
        .map(key => enumeration[key])
        .filter(
            (val): val is NonFunctional<T[keyof T]> =>
                typeof val === 'number' || typeof val === 'string',
        );
}
