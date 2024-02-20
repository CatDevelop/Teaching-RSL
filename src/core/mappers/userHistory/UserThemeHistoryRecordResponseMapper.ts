import { UserThemeHistoryRecordResponseDto } from "core/dtos/userHistory/UserThemeHistoryRecordResponseDto";
import { UserThemeHistoryRecordResponse } from "core/models/userHistory/UserThemeHistoryRecordResponse";

export namespace UserThemeHistoryRecordResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: UserThemeHistoryRecordResponseDto): UserThemeHistoryRecordResponse {
		return new UserThemeHistoryRecordResponse({
			themeId: dto.themeId,
            themeName: dto.themeName,
            wordsCompletedCount: dto.wordsCompletedCount,
            wordsCount: dto.wordsCount,
			description: dto.description,
		});
	}
}