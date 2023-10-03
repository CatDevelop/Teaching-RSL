import React from 'react';
import {RouteObject} from "react-router-dom";
import {LearningCatalogPage} from "./pages/LearningCatalogPage";
import {LearningTaskPage} from "./pages/LearningTaskPage";

export const learningRoutes: RouteObject[] = [
    {
        path: 'learning',
        children:[
            {
                path: '',
                element: <LearningCatalogPage />,
            },
            {
                path: 'task',
                element: <LearningTaskPage />,
            }
        ],
    }
]
