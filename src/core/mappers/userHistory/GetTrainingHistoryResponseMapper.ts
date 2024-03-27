import { UserThemeHistoryRecordResponseDto } from "core/dtos/userHistory/UserThemeHistoryRecordResponseDto";
import { UserThemeHistoryRecordResponse } from "core/models/userHistory/UserThemeHistoryRecordResponse";
import {GetTrainingHistoryResponse} from "../../models/userHistory/GetTrainingHistoryResponse";

export namespace GetTrainingHistoryResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: GetTrainingHistoryResponse): GetTrainingHistoryResponse {
		return new GetTrainingHistoryResponse({
			themeInfoDalList: dto.themeInfoDalList
		});
	}
}
