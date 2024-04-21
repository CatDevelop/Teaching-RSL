import React, {FC, ReactNode, useCallback, useState} from 'react';
import {typedMemo} from "../../core/utils/typedMemo";
import {ComponentProps} from "../../core/models/ComponentProps";
import clsx from "clsx";
import styles from './MaterialModal.module.css';
import {ReactComponent as AngleExpand} from 'assets/images/AngleExpand.svg';
import {Modal} from "../Modal/Modal";

export type Props = ComponentProps & {
    /**
     * Отображаемый материал
     */
    material: ReactNode;

    /**
     * Отображаемый в окне материал
     */
    expandedMaterial?: ReactNode;

    /**
     * Класс для модального окна
     */
    modalClassName?: string;
}

/**
 * Модальное окно с материаом
 */
export const MaterialModal: FC<Props> = typedMemo(function MaterialModal(props) {
    const [isOpen, setIsOpen] = useState(false)

    const onClose = useCallback(() => setIsOpen(false), [[]])

    const onOpen = useCallback(() => setIsOpen(true), [[]])

    return (
        <>
            <div className={clsx(styles.material, props.className)}>
                {props.material}
                <button className={clsx(styles.expandButton)} onClick={onOpen}>
                    <AngleExpand className={clsx(styles.expandButtonIcon)}/>
                </button>
            </div>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                className={clsx(styles.modal, props.modalClassName)}
                closeButtonClassName={styles.modalCloseButton}
            >
                <div className={clsx(styles.material)}>
                    {props.expandedMaterial ?? props.material}
                </div>
            </Modal>
        </>
);
});
