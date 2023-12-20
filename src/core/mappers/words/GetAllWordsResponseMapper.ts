import {GetAllWordsResponseDto} from "../../dtos/words/GetAllWordsResponseDto";
import {GetAllWordsResponse} from "../../models/words/GetAllWordsResponse";
import {UnitResponseMapper} from "./UnitResponseMapper";

export namespace GetAllWordsResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetAllWordsResponseDto): GetAllWordsResponse {
		return new GetAllWordsResponse({
            id:dto.id,
            units:dto.units.map(word => UnitResponseMapper.fromDto(word)),
            name:dto.name,
		});
	}
}
