/**
 * Лист разделов с уровнями.
 */
export class GetUnitListWithLevelsResponse {
    /**
     * Лист разделов с уровнями.
     */
    public readonly units: readonly GetUnitWithLevelsResponse[];

    public constructor({units}: GetUnitListWithLevelsResponseProps){
        this.units = units;
    }
}

type GetUnitListWithLevelsResponseProps = GetUnitListWithLevelsResponse;

/**
 * Раздел с уровнями.
 */
export class GetUnitWithLevelsResponse {
    /**
     * Id.
     */
    public readonly id: string;

    /**
     * Название.
     */
    public readonly name: string;

    /**
     * Количество слов в разделе.
     */
    public readonly wordsCount: number;

    /**
     * Разделы.
     */
    public readonly levels: readonly LevelInUnit[];

    /**
     * Пройденное количество слов в теме.
     */
    public completedWordsCount?: number;

    public constructor({id, name, wordsCount, levels}: GetUnitWithLevelsResponseProps){
        this.id = id;
        this.name = name;
        this.wordsCount = wordsCount;
        this.levels = levels;
    }
}

type GetUnitWithLevelsResponseProps = GetUnitWithLevelsResponse;

/**
 * Уровень в разделе.
 */
export class LevelInUnit {
    /**
     * Id.
     */
    public readonly id: string;

    /**
     * Название.
     */
    public readonly name: string;

    /**
     * Количество слов в уровне.
     */
    public readonly wordsCount: number;

    public constructor({id, name, wordsCount}: LevelInUnitProps) {
        this.id = id;
        this.name = name;
        this.wordsCount = wordsCount;
    }
}

type LevelInUnitProps = LevelInUnit;
