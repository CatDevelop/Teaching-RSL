import React, { FC, MouseEventHandler, PropsWithChildren, useCallback, useEffect } from 'react';

import styles from './Modal.module.css';
import {ComponentProps} from "../../core/models/ComponentProps";
import {typedMemo} from "../../core/utils/typedMemo";
import {Portal} from "../Portal";
import clsx from "clsx";
import {ReactComponent as CloseIcon} from 'assets/images/Close.svg'

export type Props = ComponentProps & PropsWithChildren & Readonly<{
    /**
     * Открыто ли модальное окно
     */
    isOpen: boolean;

    /**
     * Метод закрытия модального окна
     */
    onClose?: () => void;

    /**
     * Показывать ли закрывающий крест
     * @default true
     */
    showClosingCross?: boolean;

    /**
     * Закрывать ли модальное окно по клику вне него
     * @default true
     */
    shouldCloseOnOverlayClick?: boolean;

    /**
     * Закрывать ли модальное окно по нажатию Esc
     * @default true
     */
    shouldCloseOnEsc?: boolean;

    /**
     * Размонтируется ли модальное окно из дерева
     * @default true
     */
    isUnmountable?: boolean;

    /**
     * Класс для overlay
     */
    overlayClassName?: string;
}>;

/**
 * Модальное окно
 */
export const Modal: FC<Props> = typedMemo(function Modal({
                                                             isOpen,
                                                             onClose,
                                                             showClosingCross = true,
                                                             shouldCloseOnOverlayClick = true,
                                                             shouldCloseOnEsc = true,
                                                             isUnmountable = true,
                                                             className,
                                                             children,
                                                             overlayClassName,
                                                         }) {
    const onContentClick: MouseEventHandler<HTMLDivElement> = event => {
        event.stopPropagation();
    };

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape' && shouldCloseOnEsc) {
            onClose?.();
        }
    }, [onClose, shouldCloseOnEsc]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    if (isUnmountable && !isOpen) {
        return null;
    }
    return (
        <Portal element={document.querySelector('#modal-portal')! as HTMLElement}>
            <div
                onClick={shouldCloseOnOverlayClick ? onClose : undefined}
                className={clsx(styles.overlay, isOpen ? styles.isOpen : false, overlayClassName)}
            >
                <div
                    className={clsx(styles.modal, className)}
                    onClick={onContentClick}
                >
                    {showClosingCross
                        ? <button onClick={onClose} className={clsx(styles.closeButton)}>
                            <CloseIcon className={clsx(styles.closeButtonIcon)} />
                        </button>
                        : null}
                    {children}
                </div>
            </div>
        </Portal>
    );
});
