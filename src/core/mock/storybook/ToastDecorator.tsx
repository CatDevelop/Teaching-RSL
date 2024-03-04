import {ToastContainer} from 'react-toastify';
import React from 'react';

import {type Decorator} from '@storybook/react';

/**
 * Storybook-декоратор для работы toast
 * @param Story стори, который оборачиваем
 */
export const ToastDecorator: Decorator = Story => {
    return (
        <>
            <Story/>
            <ToastContainer/>
        </>
    );
};