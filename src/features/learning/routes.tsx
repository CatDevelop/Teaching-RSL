import React from 'react';
import {RouteObject} from "react-router-dom";
import {LearningTaskPage} from "./pages/LearningTaskPage";
import WithSideBarLayout from "../../components/WithSideBarLayout";
import {TrainingCatalogPage} from "../training/pages/TrainingCatalogPage";
import {TrainingPage} from "../training/pages/TrainingPage";
import {LearningCatalogPage} from "./pages/LearningCatalogPage";

export const learningRoutes: RouteObject[] = [
    {
        path: 'learning',
        children:[
            {
                path: ':id',
                element: <LearningTaskPage />,
            }
        ],
    },
    {
        path: 'learning',
        element: <WithSideBarLayout/>,
        children:[
            {
                path: '',
                element: <LearningCatalogPage />,
            },
        ],
    }
]
