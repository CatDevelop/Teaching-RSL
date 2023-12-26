import {GetUserTestsResponseDto} from "../../dtos/training/GetUserTestsResponseDto";
import {GetUserTestsResponse} from "../../models/training/GetUserTestsResponse";

export namespace GetUserTestsResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetUserTestsResponseDto): GetUserTestsResponse {
		return new GetUserTestsResponse ({
			userTestList: dto.userTestList,
		});
	}
}
