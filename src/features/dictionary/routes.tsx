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
                children: [
                    {
                        path: ':themeId',
                        children: [
                            {
                                path: 'word/:wordId'
                            },
                            {
                                path: ':sectionId',
                                children: [
                                    {
                                        path: 'word/:wordId'
                                    }
                                ]
                            }
                        ]
                    },
                ]
            },
        ],
    },
]
