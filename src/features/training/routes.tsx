import React from "react";
import {RouteObject} from "react-router-dom";
import {TrainingPage} from "./pages/TrainingPage";
import {TrainingCatalogPage} from "./pages/TrainingCatalogPage";

export const trainingRoutes: RouteObject[] = [
    {
        path: 'training',
        children:[
            {
                path: '',
                element: <TrainingCatalogPage />,
            },
            {
                path: ':id',
                element: <TrainingPage />,
            },

        ],
    }
]
