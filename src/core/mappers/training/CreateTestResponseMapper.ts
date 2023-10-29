import { CreateTestResponseDto } from "../../dtos/training/CreateTestReaponseDto";
import { CreateTestResponse } from "../../models/training/CreateTestResponse";

export namespace CreateTestResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: CreateTestResponseDto): CreateTestResponse {
		return new CreateTestResponse({id: dto.id});
	}
}
