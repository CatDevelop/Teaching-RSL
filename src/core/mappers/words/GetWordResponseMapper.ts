import { GetWordResponse } from "core/models/words/GetWordResponse";
import { GetWordResponseDto } from "core/dtos/words/GetWordResponseDto";
import { IllustrationWordResponseMapper } from "./IllustrationWordResponseMapper";


export namespace GetWordResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetWordResponseDto): GetWordResponse {
		return new GetWordResponse ({
			description: dto.description,
            id:dto.id,
            word:dto.word,
            illustrations:dto.illustrations.map(illustrationDto => IllustrationWordResponseMapper.fromDto(illustrationDto)),
		});
	}
}
