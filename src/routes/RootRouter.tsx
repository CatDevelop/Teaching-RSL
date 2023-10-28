import React, {FC} from 'react';
import {RouteObject, useRoutes} from 'react-router-dom';
import HomeLayout from '../components/WelcomeLayout';
import {HomePage} from '../features/HomePage/HomePage';
import {learningRoutes} from '../features/learning/routes';
import {trainingRoutes} from '../features/training/routes';
import {errorsRouts} from "../features/errors/routes";
import {adminRoutes} from "../features/admin/routes";
import { authRoutes } from '../features/auth/routes';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <HomeLayout/>,
        children: [
           {
            path: '',
            element: <HomePage/>
           } ,
        ]
    },
    ...authRoutes,
    ...learningRoutes,
    ...trainingRoutes,
    ...adminRoutes,
    ...errorsRouts
];

export const RootRouter: FC = () => useRoutes(routes);
