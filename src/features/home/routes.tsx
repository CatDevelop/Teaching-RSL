import React from 'react';
import {RouteObject} from "react-router-dom";
import {HomePage} from "./pages/HomePage";

export const homeRoutes: RouteObject[] = [
    {
        path: '',
        element: <HomePage/>
    }
]
