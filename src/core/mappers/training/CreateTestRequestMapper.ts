import { CreateTestRequestDto } from "../../dtos/training/CreateTestRequestDto";
import { CreateTestRequest } from "../../models/training/CreateTestRequest";

export namespace CreateTestRequestMapper {
	/**
	 * Маппинг модели в DTO.
	 * @param model Модель.
	 */
	export function toDto(model: CreateTestRequest): CreateTestRequestDto {
		return {
			id: model.id,
			trainingType: model.trainingType,
			wordsCount: model.wordsCount,
		};
	}
}
