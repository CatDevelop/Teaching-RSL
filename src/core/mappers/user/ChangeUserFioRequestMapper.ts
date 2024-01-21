import { ChangeUserFioRequest } from "core/models/user/ChangeUserFioRequest";
import { ChangeUserFioRequestDto } from "core/dtos/user/ChangeUserFioRequestDto";

export namespace ChangeUserFioRequestMapper {
	/**
	 * Маппинг модели в DTO.
	 * @param model Модель.
	 */
	export function toDto(model: ChangeUserFioRequest): ChangeUserFioRequestDto {
		return {
			firstName: model.firstName,
			lastName: model.lastName
		};
	}
}
