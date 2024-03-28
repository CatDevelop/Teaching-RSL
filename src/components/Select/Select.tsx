import React from 'react';
import {default as ReactSelect, Props as SelectProps} from "react-select";
import {ComponentProps} from "../../core/models/ComponentProps";
import {typedMemo} from "../../core/utils/typedMemo";
import styles from './Select.module.css'
import {ActionMeta, OnChangeValue} from "react-select/dist/declarations/src/types";
import clsx from "clsx";

export type Props<Option, IsMulti extends boolean> = ComponentProps &
    Omit<SelectProps<Option, IsMulti>, 'onChange'> &
    {
        onChange: (newValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) => void;
    };


/**
 * Поле выбора
 */
export const Select = typedMemo(function Select<Option, IsMulti extends boolean = false>(props: Props<Option, IsMulti>) {
    return (
        <ReactSelect
            placeholder="Выберите"
            noOptionsMessage={() => "Нет доступных элементов"}
            {...props}
            classNames={{
                clearIndicator: state => styles.clearIndicator,
                container: state => styles.container,
                control: state => styles.control,
                dropdownIndicator: state => styles.dropdownIndicator,
                group: state => styles.group,
                groupHeading: state => styles.groupHeading,
                indicatorsContainer: state => styles.indicatorsContainer,
                indicatorSeparator: state => styles.indicatorSeparator,
                input: state => styles.input,
                loadingIndicator: state => styles.loadingIndicator,
                loadingMessage: state => styles.loadingMessage,
                menu: state => styles.menu,
                menuList: state => styles.menuList,
                menuPortal: state => styles.menuPortal,
                multiValue: state => styles.multiValue,
                multiValueLabel: state => styles.multiValueLabel,
                multiValueRemove: state => styles.multiValueRemove,
                noOptionsMessage: state => styles.noOptionsMessage,
                option: state => clsx(styles.option, state.isSelected && styles.option_selected),
                placeholder: state => styles.placeholder,
                singleValue: state => styles.singleValue,
                valueContainer: state => styles.valueContainer,
            }}
        />
    );
});
