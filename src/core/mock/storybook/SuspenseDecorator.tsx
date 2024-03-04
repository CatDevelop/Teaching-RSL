import { Decorator } from '@storybook/react';
import React, { Suspense } from 'react';

import { Spinner } from '@nextui-org/react';

export const SuspenseDecorator: Decorator = Story => {
    return (
        <Suspense fallback={<Spinner />}>
            <Story />
        </Suspense>
    );
};