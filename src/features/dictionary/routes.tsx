import React from 'react';
import {RouteObject} from "react-router-dom";
import WithSideBarLayout from "../../components/WithSideBarLayout";
import {DictionaryPage} from "./pages/DictionaryPage";

export const dictionaryRoutes: RouteObject[] = [
    {
        path: 'dictionary',
        element: <WithSideBarLayout/>,
        children: [
            {
                path: '',
                element: <DictionaryPage/>,
            },
        ],
    }
]
