import { CreateUserTestRequest } from "core/models/training/CreateUserTestRequest";
import { CreateUserTestRequestDto } from "core/dtos/training/CreateUserTestRequestDto";

export namespace CreateUserTestRequestMapper {
	/**
	 * Маппинг модели в DTO.
	 * @param model Модель.
	 */
	export function toDto(model: CreateUserTestRequest): CreateUserTestRequestDto {
		return {
			testName: model.testName,
			wordIdList: model.wordIdList ?? [],
		};
	}
}
