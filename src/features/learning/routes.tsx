import React from 'react';
import {RouteObject} from "react-router-dom";
import {LearningTaskPage} from "./pages/LearningTaskPage";
import {LearningCatalogPage} from "./pages/LearningCatalogPage";
import HomeLayout from "../../components/WelcomeLayout";
import {TrainingPage} from "../training/pages/TrainingPage";
import WithSideBarLayout from "../../components/WithSideBarLayout";
import {LearningResultPage} from "./pages/LearningResultPage";

export const learningRoutes: RouteObject[] = [
    {
        path: 'learning',
        element: <WithSideBarLayout/>,
        children: [
            {
                path: '',
                element: <LearningCatalogPage/>,
            },

        ],
    },
    {
        path: 'learning',
        element: <HomeLayout/>,
        children: [
            {
                path: ':id',
                element: <LearningTaskPage/>,
            },
            {
                path: ':id/result',
                element: <LearningResultPage/>,
            },
        ],
    },
]
