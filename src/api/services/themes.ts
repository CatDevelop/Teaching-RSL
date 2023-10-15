import { GetThemeListWithUnitsResponse } from "../../core/models/themes/GetThemeListWithUnitsResponse";
import { ApiUrlsConfig } from "../apiUrlsConfig";
import { http } from "../http";
import { GetThemeListWithUnitsResponseDto } from "../../core/dtos/themes/GetThemeListWithUnitsResponseDto";
import { GetThemeListWithUnitsResponseMapper } from "../../core/mappers/themes/GetThemeListWithUnitsResponseMapper";
import { GetThemeListResponse } from "../../core/models/themes/GetThemeListResponse";
import { GetThemeListResponseDto } from "../../core/dtos/themes/GetThemeListResponseDto";
import { GetThemeListResponseMapper } from "../../core/mappers/themes/GetThemeListResponseMapper";

export namespace ThemesService {
    export async function getListWithUnits(): Promise<GetThemeListWithUnitsResponse> {
        const {data} = await http.get<GetThemeListWithUnitsResponseDto>(ApiUrlsConfig.themes.getListWithUnits());
        return GetThemeListWithUnitsResponseMapper.fromDto(data);
    }

    export async function getList(): Promise<GetThemeListResponse> {
        const {data} = await http.get<GetThemeListResponseDto>(ApiUrlsConfig.themes.getList);
        return GetThemeListResponseMapper.fromDto(data);
    }
}
