import { GetWelcomeBackInfoResponse } from "core/models/user/GetWelcomeBackInfoResponse";
import { GetWelcomeBackInfoResponseDto } from "core/dtos/user/GetWelcomeBackInfoResponseDto";


export namespace GetWelcomeBackInfoResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetWelcomeBackInfoResponseDto): GetWelcomeBackInfoResponse {
		return new GetWelcomeBackInfoResponse(dto);
	}
}
