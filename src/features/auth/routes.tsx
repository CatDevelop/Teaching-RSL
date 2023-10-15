import React from 'react';
import {RouteObject} from "react-router-dom";
import { LoginPage } from './pages/LoginPage';
import { LogupPage } from './pages/LogupPage';

export const authRoutes: RouteObject[] = [
    {
        path: 'signin',
        element: <LoginPage/>,
    },
    {
        path: 'signup',
        element: <LogupPage/>,
    }
]
