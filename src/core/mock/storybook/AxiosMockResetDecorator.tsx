import {Decorator} from '@storybook/react';

import {resetAxiosMock} from '../resetAxiosMock';

/**
 * Сбрасывает все моки с http
 * @param story стори, которую оборачиваем
 */
export const AxiosMockResetDecorator: Decorator = story => {
    resetAxiosMock();

    return story();
};