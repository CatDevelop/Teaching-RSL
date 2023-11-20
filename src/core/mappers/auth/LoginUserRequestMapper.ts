import { LoginUserRequest } from "core/models/auth/LoginUserRequest";
import { LoginUserRequestDto } from "core/dtos/auth/LoginUserRequestDto";

export namespace LoginUserRequestMapper {
	/**
	 * Маппинг модели в DTO.
	 * @param model Модель.
	 */
	export function toDto(model: LoginUserRequest): LoginUserRequestDto {
		return {
			username: model.email,
			password: model.password,
		};
	}
}
