import {GetAllWordsResponseDto} from "../../dtos/words/GetAllWordsResponseDto";
import {GetAllWordsResponse} from "../../models/words/GetAllWordsResponse";
import {WordResponseMapper} from "./WordResponseMapper";

export namespace GetAllWordsResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetAllWordsResponseDto): GetAllWordsResponse {
		return new GetAllWordsResponse({
			blockType: dto.blockType,
            id:dto.id,
            words:dto.words.map(word => WordResponseMapper.fromDto(word)),
            name:dto.name,
		});
	}
}
