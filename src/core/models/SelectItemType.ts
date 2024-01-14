/**
 * Выбранный объект
 */
export class SelectItemType<TValue> {
    public readonly label: string;
    public readonly value: TValue;

    public constructor({label, value}: SelectItemTypeProps<TValue>) {
        this.label = label;
        this.value = value;
    }
}

type SelectItemTypeProps<TValue> = SelectItemType<TValue>;

