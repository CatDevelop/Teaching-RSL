import {type Decorator} from '@storybook/react';
import React from 'react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import * as H from 'history';

/**
 * Storybook-декоратор для работы React-Router
 * @param routePath
 * @param initialEntries
 */
export const MemoryRouterDecorator: (routePath: string, initialEntries?: H.InitialEntry[]) => Decorator =
    (routePath, initialEntries) => {
        return (function MemoryRouterWrapper(Story) {
            return (
                <MemoryRouter initialEntries={initialEntries}>
                    <Routes>
                        <Route path={routePath} element={<Story/>}/>
                    </Routes>
                </MemoryRouter>
            );
        });
    };