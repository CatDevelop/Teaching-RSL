import {GetLevelResponse} from "core/models/learning/GetLevelResponse";
import {GetLevelResponseDto} from "../../dtos/learning/GetLevelResponseDto";

export namespace GetLevelResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetLevelResponseDto): GetLevelResponse {
		return new GetLevelResponse({
			name: dto.name,
			wordsCount: dto.wordsCount,
			wordsIdList: dto.wordsIdList
		});
	}
}
