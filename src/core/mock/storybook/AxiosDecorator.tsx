import {Decorator} from '@storybook/react';

import {AxiosMockOptions, mockAxios} from '../mockAxios';

/**
 * Мокает запросы axios
 * @param options настройки мока
 */
export const AxiosDecorator: <T,>(options: AxiosMockOptions<T>) => Decorator = <T,>(options: AxiosMockOptions<T>) => {
    return (function AxiosMockWrapper(story) {
        mockAxios(options);

        return story();
    });
};