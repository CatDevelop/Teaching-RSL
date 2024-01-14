import {SendLevelResultRequest} from "../../models/userHistory/SendLevelResultRequest";
import {SendLevelResultRequestDto} from "../../dtos/userHistory/SendLevelResultResponseDto";

export namespace SendLevelResultRequestMapper {
	/**
	 * Маппинг модели в DTO.
	 * @param model Модель.
	 */
	export function toDTO(model: SendLevelResultRequest): SendLevelResultRequestDto {
		return {
			levelId: model.levelId,
			completedWords: model.completedWords
		};
	}
}
