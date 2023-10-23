import { GetThemeListWithUnitsResponseDto, GetThemeWithUnitsResponseDto } from "../../dtos/themes/GetThemeListWithUnitsResponseDto";
import { GetThemeListWithUnitsResponse, GetThemeWithUnitsResponse } from "../../models/themes/GetThemeListWithUnitsResponse";
import { GetUnitResponseMapper } from "../unit/GetUnitResponseMapper";

namespace GetThemeWithUnitsResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetThemeWithUnitsResponseDto): GetThemeWithUnitsResponse {
		return new GetThemeWithUnitsResponse({
			id: dto.id,
            description: dto.description,
            name: dto.name,
            wordsCount: dto.wordsCount,
            units: dto.units.map(unitDto => GetUnitResponseMapper.fromDto(unitDto)),
		});
	}
}

export namespace GetThemeListWithUnitsResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetThemeListWithUnitsResponseDto): GetThemeListWithUnitsResponse {
		return new GetThemeListWithUnitsResponse({
			themeList: dto.themeList.map(themeDto => GetThemeWithUnitsResponseMapper.fromDto(themeDto)),
		});
	}
}
