import { UserUnitWithLevelsHistoryRecordResponseDto } from "core/dtos/userHistory/UserUnitWithLevelsHistoryRecordResponseDto";
import { UserUnitWithLevelsHistoryRecordResponse } from "core/models/userHistory/UserUnitWithLevelsHistoryRecordResponse";

export namespace UserUnitWithLevelsHistoryRecordResponseMapper {
	/**
	 * Маппинг DTO в модель.
	 * @param dto DTO.
	 */
	export function fromDto(dto: UserUnitWithLevelsHistoryRecordResponseDto): UserUnitWithLevelsHistoryRecordResponse {
		return new UserUnitWithLevelsHistoryRecordResponse({
			unitId: dto.unitId,
            unitName: dto.unitName,
            unitWordsCount: dto.unitWordsCount,
			levelsHistory: dto.levelsHistory,
		});
	}
}