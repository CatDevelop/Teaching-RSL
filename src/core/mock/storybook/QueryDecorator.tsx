import {QueryClientProvider} from 'react-query';
import React from 'react';

import { queryClient } from 'core/config/queryClient';
import { Decorator } from '@storybook/react';

export const QueryDecorator: Decorator = Story => {
    return (
        <QueryClientProvider client={queryClient}>
            <Story/>
        </QueryClientProvider>
    );
}