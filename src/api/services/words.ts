import { ApiUrlsConfig } from "../apiUrlsConfig";
import { http } from "api/http";
import { GetWordResponse } from "core/models/words/GetWordResponse";
import { GetWordResponseMapper } from "core/mappers/words/GetWordResponseMapper";
import { GetWordResponseDto } from "core/dtos/words/GetWordResponseDto";
import { WordResponse } from "core/models/words/WordResponse";
import { WordResponseDto } from "core/dtos/words/WordResponseDto";
import { WordResponseMapper } from "core/mappers/words/WordResponseMapper";

export namespace WordsService {
    export async function getWordById(wordId: string): Promise<GetWordResponse> {
        return await http.get<GetWordResponseDto>(ApiUrlsConfig.words.getById(wordId)).then(res => GetWordResponseMapper.fromDto(res.data));
    }

    export async function getWordsBySearch(search: string): Promise<WordResponse[]> {
        return await http.get<WordResponseDto[]>(ApiUrlsConfig.words.getBySearch(search)).then(res => res.data.map(dto => WordResponseMapper.fromDto(dto)));
    }
}