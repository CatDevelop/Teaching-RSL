import {GetLevelTasksResponseDto} from "../../dtos/learning/GetLevelTasksResponseDto";
import {GetLevelTasksResponse} from "../../models/learning/GetLevelTasksResponse";

export namespace GetLevelTasksResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetLevelTasksResponseDto): GetLevelTasksResponse {
		return new GetLevelTasksResponse({
			singleTasks: dto.singleTasks,
			multiTasks: dto.multiTasks
		});
	}
}
