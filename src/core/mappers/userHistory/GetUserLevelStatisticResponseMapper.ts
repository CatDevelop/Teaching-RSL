import { GetUserLevelStatisticResponseDto } from "core/dtos/userHistory/GetUserLevelStatisticResponseDto";
import { GetUserLevelStatisticResponse } from "core/models/userHistory/GetUserLevelStatisticResponse";

export namespace GetUserLevelStatisticResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetUserLevelStatisticResponseDto): GetUserLevelStatisticResponse {
		return new GetUserLevelStatisticResponse({
			completedLevelsCount: dto.completedLevelsCount,
            completedWordsCount: dto.completedWordsCount,
            trophiesCount: dto.trophiesCount,
		});
	}
}