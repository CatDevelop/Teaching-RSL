import React from 'react';
import {RouteObject} from "react-router-dom";
import {ProfilePage} from "./pages/ProfilePage";
import WithSideBarLayout from "../../components/WithSideBarLayout";
import {LearningCatalogPage} from "../learning/pages/LearningCatalogPage";

export const profileRoutes: RouteObject[] = [
    {
        path: 'profile',
        element: <WithSideBarLayout/>,
        children: [
            {
                path: '',
                element: <ProfilePage/>,
            },
        ],
    }

]
