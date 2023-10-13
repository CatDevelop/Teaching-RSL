import { TestGetResponseDto, WordInTestDto } from "../../../core/dtos/training/TestGetResponseDto";
import { TestGetResponse, WordInTest } from "../../../core/models/training/TestGetResponse";


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

export namespace TestGetResponseMapper {

	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: TestGetResponseDto): TestGetResponse {
		return new TestGetResponse ({
			id: dto.id,
			words: dto.words.map(wordDto => WordInTestMapper.fromDto(wordDto)),
			name: dto.name,
		});
	}
}
