import { WordResponse } from "core/models/words/WordResponse";
import { WordResponseDto } from "core/dtos/words/WordResponseDto";


export namespace WordResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: WordResponseDto): WordResponse {
		return new WordResponse ({
            id:dto.id,
            word:dto.word,
		});
	}
}
