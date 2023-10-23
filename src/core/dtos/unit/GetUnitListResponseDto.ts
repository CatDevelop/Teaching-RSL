import {GetUnitResponseDto} from "./GetUnitResponseDto";

/**
 * Лист разделов.
 */
export type GetUnitListResponseDto = Readonly<{
    /**
     * Лист разделов.
     */
    units: readonly GetUnitResponseDto[];
}>
