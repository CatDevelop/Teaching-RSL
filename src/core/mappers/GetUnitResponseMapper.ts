import { GetUnitResponseDto } from "../dtos/GetUnitResponseDto";
import { GetUnitResponse } from "../models/GetUnitResponse";

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