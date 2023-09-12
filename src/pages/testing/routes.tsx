import React from 'react';
import { RouteObject } from "react-router-dom";
import { NotDevelopedPage } from "../NotDevelopedPage";

export const testingRoutes: RouteObject[] = [
    {
        path: 'testing',
        element: <NotDevelopedPage/>,
    }
]