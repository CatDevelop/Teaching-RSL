import React from 'react';
import {RouteObject} from "react-router-dom";
import {ProfilePage} from "./pages/ProfilePage";
import WithSideBarLayout from "../../components/WithSideBarLayout";
import {ProfileSettingsPage} from "./pages/ProfileSettingsPage";

export const profileRoutes: RouteObject[] = [
    {
        path: 'profile',
        element: <WithSideBarLayout/>,
        children: [
            {
                path: '',
                element: <ProfilePage/>,
            },
            {
                path: 'settings',
                element: <ProfileSettingsPage/>,
            },
        ],
    }
]
