import React from 'react';
import {RouteObject} from "react-router-dom";
import WithSideBarLayout from "../../components/WithSideBarLayout";
import {DictionaryByThemePage} from "./pages/DictionaryByThemePage";

export const dictionaryRoutes: RouteObject[] = [
    {
        path: 'dictionary',
        element: <WithSideBarLayout/>,
        children: [
            {
                path: 'by-theme',
                element: <DictionaryByThemePage/>,
            },
        ],
    }
]
