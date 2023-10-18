import { GetThemeListResponseDto, GetThemeResponseDto } from "../../dtos/themes/GetThemeListResponseDto";
import { GetThemeListResponse, GetThemeResponse } from "../../models/themes/GetThemeListResponse";

namespace GetThemeResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetThemeResponseDto): GetThemeResponse {
		return new GetThemeResponse({
			id: dto.id,
            description: dto.description,
            name: dto.name,
            wordsCount: dto.wordsCount,
		});
	}
}

export namespace GetThemeListResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetThemeListResponseDto): GetThemeListResponse {
		return new GetThemeListResponse({
			themeList: dto.themeList.map(themeDto => GetThemeResponseMapper.fromDto(themeDto)),
		});
	}
}
