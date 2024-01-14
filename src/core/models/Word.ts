export type Word = Readonly<{
    id: number;
    text: string;
    recognitionText: string;
    gifSource: string;
    altGifSource?: string;
    imageSource?: string;
}>

/**
 * Слово с сервера
 */
export type WordFormServer = Readonly<{
    wordId: number;
    firstRepresentation: string | null;
    secondRepresentation: string | null;
}>

/**
 * Слово с сервера
 */
export type WordFormServer2 = Readonly<{
    id: string;
    word: string;
    illustrations: {path: string, fileType: string}[]
}>

