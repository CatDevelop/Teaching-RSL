import React from 'react';
import {RouteObject} from "react-router-dom";
import WithSideBarLayout from "../../components/WithSideBarLayout";
import {DictionaryPage} from "./pages/DictionaryPage";
import {DictionaryLearningPage} from "./pages/DictionaryLearningPage";

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
                                path: ':sectionId',
                            }
                        ]
                    },
                ]
            },
            {
                path: 'learning/:wordId',
                element: <DictionaryLearningPage/>
            },
        ],
    },
]
