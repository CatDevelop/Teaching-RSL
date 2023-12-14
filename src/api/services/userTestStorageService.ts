import { LocalStorageService } from "./localStorageService";

/**
 * Хранилище id слов для пользовательского теста
 */
export namespace UserTestStorageService {
    /**
     * Метод добавления id слова в хранилище
     * @param wordId id слова
     */
    export function addWord(wordId: string): void {
        if(checkWordIdInStorage(wordId)){
            return;
        }

        const wordIds: string[] = getWords();
        LocalStorageService.set('userTestWordIds', JSON.stringify([...wordIds, wordId]))    
    }

    /**
     * Метод удаления id слова из хранилища
     * @param wordId id слова
     */
    export function deleteWord(wordId: string): void {
        if(!checkWordIdInStorage(wordId)){
            return;
        }

        const filteredWordIds = getWords().filter(id => id !== wordId);
        LocalStorageService.set('userTestWordIds', JSON.stringify(filteredWordIds))    
    }

    /**
     * Метод удаления всех id слов из хранилища
     */
    export function resetWords(): void {
        LocalStorageService.set('userTestWordIds', '[]')   
    }

    /**
     * Метод получения id слов из хранилища
     */
    export function getWords(): string[] {
        return JSON.parse(LocalStorageService.get('userTestWordIds') ?? '[]');
    }

    /**
     * Метод проверки id слова в хранилище
     * @param wordId id слова
     */
    function checkWordIdInStorage(wordId: string): boolean {
        return getWords().find(id => id === wordId) !== undefined;
    }
}