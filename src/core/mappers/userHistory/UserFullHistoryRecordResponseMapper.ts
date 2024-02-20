import { UserFullHistoryRecordResponseDto } from "core/dtos/userHistory/UserFullHistoryRecordResponseDto";
import { UserFullHistoryRecordResponse } from "core/models/userHistory/UserFullHistoryRecordResponse";

export namespace UserFullHistoryRecordResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: UserFullHistoryRecordResponseDto): UserFullHistoryRecordResponse {
		return new UserFullHistoryRecordResponse({
			themeId: dto.themeId,
            themeName: dto.themeName,
            wordsCount: dto.wordsCount,
			wordsCompletedCount: dto.wordsCompletedCount,
			unitsHistory: dto.unitsHistory
		});
	}
}