import React from 'react';
import { RouteObject } from "react-router-dom";
import { NotDevelopedPage } from "../NotDevelopedPage";

export const learningRoutes: RouteObject[] = [
    {
        path: 'learning',
        element: <NotDevelopedPage/>,
    }
]