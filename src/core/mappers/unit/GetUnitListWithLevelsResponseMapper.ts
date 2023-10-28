import {
	GetUnitListWithLevelsResponse,
	GetUnitWithLevelsResponse,
	LevelInUnit
} from "../../models/unit/GetUnitListWithLevelsResponse";
import {
	GetLevelResponseDto,
	GetUnitListWithLevelsResponseDto,
	GetUnitWithLevelsResponseDto
} from "../../dtos/unit/GetUnitListWithLevelsResponseDto";

namespace GetLevelResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetLevelResponseDto): LevelInUnit {
		return new LevelInUnit({
			id: dto.id,
			name: dto.name,
			wordsCount: dto.wordsCount,
		});
	}
}

namespace GetUnitWithLevelsResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetUnitWithLevelsResponseDto): GetUnitWithLevelsResponse {
		return new GetUnitWithLevelsResponse({
			id: dto.id,
            name: dto.name,
            wordsCount: dto.wordsCount,
			levels: dto.levels.map(levelDto => GetLevelResponseMapper.fromDto(levelDto)),
		});
	}
}

export namespace GetUnitListWithLevelsResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetUnitListWithLevelsResponseDto): GetUnitListWithLevelsResponse {
		return new GetUnitListWithLevelsResponse({
			units: dto.units.map(unitDto => GetUnitWithLevelsResponseMapper.fromDto(unitDto)),
		});
	}
}
