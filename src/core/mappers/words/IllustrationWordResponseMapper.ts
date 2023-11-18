import { IllustrationWordResponse } from "core/models/words/IllustrationWordResponse";
import { IllustrationWordResponseDto } from "core/dtos/words/IllustrationWordResponseDto";


export namespace IllustrationWordResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: IllustrationWordResponseDto): IllustrationWordResponse {
		return new IllustrationWordResponse ({
			path:dto.path,
            fileType: dto.fileType,
		});
	}
}
