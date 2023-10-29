import {GetUnitResponse} from "./GetUnitResponse";

/**
 * Лист разделов.
 */
export class GetUnitListResponse {
    /**
     * Лист разделов.
     */
    public readonly units: readonly GetUnitResponse[];

    public constructor({units}: GetUnitListResponseProps){
        this.units = units;
    }
}

type GetUnitListResponseProps = GetUnitListResponse;
