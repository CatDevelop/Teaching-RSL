import { GetUnitResponseDto } from "../../dtos/unit/GetUnitResponseDto";
import { GetUnitResponse } from "../../models/unit/GetUnitResponse";

export namespace GetUnitResponseMapper {

	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetUnitResponseDto): GetUnitResponse {
		return new GetUnitResponse({
			id: dto.id,
            name: dto.name,
            wordsCount: dto.wordsCount,
		});
	}
}
