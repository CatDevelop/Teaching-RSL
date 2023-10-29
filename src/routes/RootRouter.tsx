import React, {FC} from 'react';
import {RouteObject, useRoutes} from 'react-router-dom';
import HomeLayout from '../components/WelcomeLayout';
import {HomePage} from '../features/HomePage/HomePage';
import {learningRoutes} from '../features/learning/routes';
import {trainingRoutes} from '../features/training/routes';
import {errorsRouts} from "../features/errors/routes";
import {adminRoutes} from "../features/admin/routes";
import { authRoutes } from '../features/auth/routes';
import {profileRoutes} from "../features/profile/routes";
import {dictionaryRoutes} from "../features/dictionary/routes";

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
    ...profileRoutes,
    ...learningRoutes,
    ...trainingRoutes,
    ...dictionaryRoutes,
    ...adminRoutes,
    ...errorsRouts
];

export const RootRouter: FC = () => useRoutes(routes);
