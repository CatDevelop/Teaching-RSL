import React from "react";
import {RouteObject} from "react-router-dom";
import {TrainingPage} from "./pages/TrainingPage";
import {TrainingCatalogPage} from "./pages/TrainingCatalogPage";
import WithSideBarLayout from "../../components/WithSideBarLayout";
import HomeLayout from "../../components/WelcomeLayout";

export const trainingRoutes: RouteObject[] = [
    {
        path: 'training',
        element: <HomeLayout/>,
        children:[
            {
                path: ':id',
                element: <TrainingPage />,
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
