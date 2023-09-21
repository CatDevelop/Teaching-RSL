import React from 'react';
import {RouteObject} from "react-router-dom";
import {LearningCatalogPage} from "./pages/LearningCatalogPage";

export const learningRoutes: RouteObject[] = [
    {
        path: 'learning',
        children:[
            {
                path: '',
                element: <LearningCatalogPage />,
            }
        ],
    }
]
