import React from 'react';
import {RouteObject} from "react-router-dom";
import { LoginPage } from './pages/LoginPage';
import { LogupPage } from './pages/LogupPage';
import { RestorePasswordPage } from './pages/RestorePasswordPage';
import { ChangePasswordPage } from './pages/ChangePasswordPage';

export const authRoutes: RouteObject[] = [
    {
        path: 'signin',
        element: <LoginPage/>,
    },
    {
        path: 'signup',
        element: <LogupPage/>,
    },
    {
        path: 'restorepassword',
        element: <RestorePasswordPage/>,
    },
    {
        path: 'changepassword',
        element: <ChangePasswordPage/>,
    }
]
