import { UserLevelHistoryRecordResponseDto } from "core/dtos/userHistory/UserLevelHistoryRecordResponseDto";
import { UserLevelHistoryRecordResponse } from "core/models/userHistory/UserLevelHistoryRecordResponse";

export namespace UserLevelHistoryRecordResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: UserLevelHistoryRecordResponseDto): UserLevelHistoryRecordResponse {
		return new UserLevelHistoryRecordResponse({
			levelId: dto.levelId,
            levelWordsCount: dto.levelWordsCount,
            completedWordsCount: dto.completedWordsCount,
		});
	}
}