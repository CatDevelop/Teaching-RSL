import {ChangeNameRequestDto} from "../../dtos/user/ChangeNameRequestDto";
import {ChangeNameRequest} from "../../models/user/ChangeNameRequest";

export namespace ChangeNameRequestMapper {
	/**
	 * Маппинг модели в DTO.
	 * @param model Модель.
	 */
	export function toDto(model: ChangeNameRequest): ChangeNameRequestDto {
		return {
			firstName: model.name,
			lastName: model.surname,
		};
	}
}
