export class SelectItemType<TValue> {
    public readonly key: string;
    public readonly value: TValue;

    public constructor({key, value}: SelectItemTypeProps<TValue>) {
        this.key = key;
        this.value = value;
    }
}

type SelectItemTypeProps<TValue> = SelectItemType<TValue>;

