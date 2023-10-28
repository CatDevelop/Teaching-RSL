import {ApiUrlsConfig} from "../apiUrlsConfig";
import {http} from "../http";
import {GetUnitListResponse} from "../../core/models/unit/GetUnitListResponse";
import {GetUnitListResponseDto} from "../../core/dtos/unit/GetUnitListResponseDto";
import {GetUnitListResponseMapper} from "../../core/mappers/unit/GetUnitListResponseMapper";
import {GetUnitListWithLevelsResponse} from "../../core/models/unit/GetUnitListWithLevelsResponse";
import {GetUnitListWithLevelsResponseDto} from "../../core/dtos/unit/GetUnitListWithLevelsResponseDto";
import {GetUnitListWithLevelsResponseMapper} from "../../core/mappers/unit/GetUnitListWithLevelsResponseMapper";

export namespace UnitService {
    export async function getListWithLevels(): Promise<GetUnitListWithLevelsResponse> {
        const {data} = await http.get<GetUnitListWithLevelsResponseDto>(ApiUrlsConfig.unit.getListWithLevels());
        return GetUnitListWithLevelsResponseMapper.fromDto(data);
    }

    export async function getList(): Promise<GetUnitListResponse> {
        const {data} = await http.get<GetUnitListResponseDto>(ApiUrlsConfig.unit.getList);
        return GetUnitListResponseMapper.fromDto(data);
    }
}
