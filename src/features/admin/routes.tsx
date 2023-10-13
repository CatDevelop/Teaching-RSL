import { RouteObject } from "react-router-dom";
import { TestingComponentPage } from "./TestingComponentPage";
import React from "react";

export const adminRoutes: RouteObject[] = [
    {
        path: 'admin/testing-component',
        element: <TestingComponentPage/>
    }
];
