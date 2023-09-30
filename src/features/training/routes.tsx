import React from "react";
import { RouteObject } from "react-router-dom";
import { TrainingCatalogPage } from './pages/TrainingCatalogPage';
import { TrainingPage } from "./pages/TrainingPage";
import { TrainingResultPage } from "./pages/TrainingResultPage";

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
            {
                path: ':id/result',
                element: <TrainingResultPage />, 
            }
        ],
    }
]