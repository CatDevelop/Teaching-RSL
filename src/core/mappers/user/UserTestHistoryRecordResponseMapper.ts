import { UserTestHistoryRecordResponse } from "core/models/user/UserTestHistoryRecordResponse";
import { UserTestHistoryRecordResponseDto } from "core/dtos/user/UserTestHistoryRecordResponseDto";


export namespace UserTestHistoryRecordResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: UserTestHistoryRecordResponseDto): UserTestHistoryRecordResponse {
		return new UserTestHistoryRecordResponse ({
			userTestHistoryId: dto.userTestHistoryId,
            name: dto.name,
            isUserTest: dto.isUserTest,
            wordsCount: dto.wordsCount,
            wordsCompletedCount: dto.wordsCompletedCount,
            completedDateTime: dto.completedDateTime,
		});
	}
}
