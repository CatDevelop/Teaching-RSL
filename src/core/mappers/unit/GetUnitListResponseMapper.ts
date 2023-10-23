import {GetUnitResponseDto} from "../../dtos/unit/GetUnitResponseDto";
import {GetUnitResponse} from "../../models/unit/GetUnitResponse";
import {GetUnitListResponseDto} from "../../dtos/unit/GetUnitListResponseDto";
import {GetUnitListResponse} from "../../models/unit/GetUnitListResponse";

namespace GetUnitResponseMapper {
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

export namespace GetUnitListResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetUnitListResponseDto): GetUnitListResponse {
		return new GetUnitListResponse({
			units: dto.units.map(unitDto => GetUnitResponseMapper.fromDto(unitDto)),
		});
	}
}
