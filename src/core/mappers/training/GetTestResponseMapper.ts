import { GetTestResponseDto, WordInTestDto } from "../../dtos/training/GetTestResponseDto";
import { GetTestResponse, WordInTest } from "../../models/training/GetTestResponse";


namespace WordInTestMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: WordInTestDto): WordInTest {
		return new WordInTest ({
			id: dto.id,
			word: dto.word,
		});
	}
}

export namespace GetTestResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetTestResponseDto): GetTestResponse {
		return new GetTestResponse ({
			id: dto.id,
			words: dto.words.map(wordDto => WordInTestMapper.fromDto(wordDto)),
			name: dto.name,
		});
	}
}
