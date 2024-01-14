import {SendTestResultRequestDto} from "../../dtos/userHistory/SendTestResultResponseDto";
import {SendTestResultRequest} from "../../models/userHistory/SendTestResultRequest";

export namespace SendTestResultRequestMapper {
    /**
     * Маппинг модели в DTO.
     * @param model Модель.
     */
    export function toDTO(model: SendTestResultRequest): SendTestResultRequestDto {
        return {
			testId: model.testId,
			incorrectWords: model.incorrectWords
        };
    }
}
