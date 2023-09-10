import React, {FC} from 'react';
import {RouteObject, useRoutes} from 'react-router-dom';
import HomeLayout from '../components/WelcomeLayout';
import { HomePage } from '../pages/HomePage';
import { learningRoutes } from '../pages/learning/routes';
import { testingRoutes } from '../pages/testing/routes';
import { NotFoundPage } from '../pages/NotFoundPage';

const routes: RouteObject[] = [
    {
        path: '*',
        element: <NotFoundPage/>,
    },
    {
        path: '/',
        element: <HomeLayout/>,
        children: [
           {
            path: '',
            element: <HomePage/>
           } ,

           ...learningRoutes,
           ...testingRoutes,
        ]
    }
];

export const RootRouter: FC = () => useRoutes(routes);