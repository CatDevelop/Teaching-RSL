import { Decorator } from '@storybook/react';
import * as H from 'history';
import { AxiosMockOptions } from '../mockAxios'; 
import { AxiosDecorator } from './AxiosDecorator';
import { MemoryRouterDecorator } from './MemoryRouterDecorator';
import { AxiosMockResetDecorator } from './AxiosMockResetDecorator';

type WrapperOptions = Partial<{
    axiosMocks: AxiosMockOptions<unknown>[];
    route: string;
    routerEntries: H.LocationDescriptor[];
    additionalWrappers: Decorator[];
}>;

/**
 * Метод возвращает все необходимые декораторы storybook
 * @param axiosMocks моки axios
 * @param route текущий путь в роутере (default: '')
 * @param routerEntries текущая история роутера (default: [])
 * @param options
 */
export function createDecorators({
    axiosMocks = [],
    route = ' ',
    routerEntries = [' '],
    additionalWrappers = [],
}: WrapperOptions): Decorator[] {
    return [
        MemoryRouterDecorator(route, routerEntries),
        ...(axiosMocks.map(data => AxiosDecorator(data))),
        AxiosMockResetDecorator,
        ...additionalWrappers,
    ];
}