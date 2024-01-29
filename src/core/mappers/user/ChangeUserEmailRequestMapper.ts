import { ChangeUserEmailRequest } from "core/models/user/ChangeUserEmailRequest";
import { ChangeUserEmailRequestDto } from "core/dtos/user/ChangeUserEmailRequestDto";

export namespace ChangeUserEmailRequestMapper {
	/**
	 * Маппинг модели в DTO.
	 * @param model Модель.
	 */
	export function toDto(model: ChangeUserEmailRequest): ChangeUserEmailRequestDto {
		return {
			email: model.email,
		};
	}
}
