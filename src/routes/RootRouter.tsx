import React, {FC} from 'react';
import {RouteObject, useRoutes} from 'react-router-dom';
import HomeLayout from '../components/WelcomeLayout';
import { HomePage } from '../features/HomePage';
import { learningRoutes } from '../features/learning/routes';
import { trainingRoutes } from '../features/training/routes';
import { NotFoundPage } from '../features/NotFoundPage';
import { adminRoutes } from '../features/admin/routes';

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
           ...trainingRoutes,
           ...adminRoutes,
        ]
    }
];

export const RootRouter: FC = () => useRoutes(routes);