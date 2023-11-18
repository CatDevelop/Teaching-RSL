import React from 'react';
import {RouteObject} from "react-router-dom";
import WithSideBarLayout from "../../components/WithSideBarLayout";
import {DictionaryPage} from "./pages/DictionaryPage";
import { DictionaryWordPage } from './pages/DictionaryWordPage';

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
    },
    {
        path:'dictionary/:id',
        element: <DictionaryWordPage/>
    }
]
