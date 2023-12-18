import { ChangePasswordRequest } from "core/models/user/ChangePasswordRequest";
import { ChangePasswordRequestDto } from "core/dtos/user/ChangePasswordRequestDto";

export namespace ChangePasswordRequestMapper {
	/**
	 * Маппинг модели в DTO.
	 * @param model Модель.
	 */
	export function toDto(model: ChangePasswordRequest): ChangePasswordRequestDto {
		return {
			oldPassword: model.oldPassword,
			newPassword: model.newPassword,
		};
	}
}
