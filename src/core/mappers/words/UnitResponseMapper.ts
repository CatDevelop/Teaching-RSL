import {WordResponseMapper} from "./WordResponseMapper";
import {UnitResponseDto} from "../../dtos/unit/UnitResponseDto";
import {UnitResponse} from "../../models/unit/UnitResponse";

export namespace UnitResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: UnitResponseDto): UnitResponse {
		return new UnitResponse({
            id: dto.id,
            words: dto.words?.map(word => WordResponseMapper.fromDto(word)) ?? null,
            name: dto.name,
		});
	}
}
