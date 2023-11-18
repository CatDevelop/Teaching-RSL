import { RegisterUserRequest } from "core/models/auth/RegisterUserRequest";
import { RegisterUserRequestDto } from "core/dtos/auth/RegisterUserRequestDto";

export namespace RegisterUserRequestMapper {
	/**
	 * Маппинг модели в DTO.
	 * @param model Модель.
	 */
	export function toDto(model: RegisterUserRequest): RegisterUserRequestDto {
		return {
			email: model.email,
            surname: model.surname,
            name: model.name,
            password: model.password,
		};
	}
}
