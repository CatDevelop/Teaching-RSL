export type Word = Readonly<{
    id: number;
    text: string;
    recognitionText: string;
    gifSource: string;
    altGifSource?: string;
    imageSource?: string;
}>


export type WordFormServer = Readonly<{
    wordId: number;
    firstRepresentation: string | null;
    secondRepresentation: string | null;
}>
