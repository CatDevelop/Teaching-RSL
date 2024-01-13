import React from "react";
import {RouteObject} from "react-router-dom";
import {TrainingPage} from "./pages/TrainingPage";
import {TrainingCatalogPage} from "./pages/TrainingCatalogPage";
import WithSideBarLayout from "../../components/WithSideBarLayout";
import HomeLayout from "../../components/WelcomeLayout";
import {TrainingResultPage} from "./pages/TrainingResultPage";

export const trainingRoutes: RouteObject[] = [
    {
        path: 'training',
        element: <HomeLayout/>,
        children:[
            {
                path: ':id',
                element: <TrainingPage />,
            },
            {
                path: ':id/result',
                element: <TrainingResultPage />,
            },
        ],
    },

    {
        path: 'training',
        element: <WithSideBarLayout/>,
        children:[
            {
                path: '',
                element: <TrainingCatalogPage />,
            },
        ],
    }
]
