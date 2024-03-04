import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import { Decorator } from '@storybook/react';

export const NextUIDecorator: Decorator = Story => {
    return (
        <NextUIProvider>
            <Story/>
        </NextUIProvider>
    );
}