import { RouteObject } from "react-router-dom";
import { TestingComponentPage } from "./TestingComponentPage";

export const adminRoutes: RouteObject[] = [
    {
        path: 'admin/testing-component',
        element: <TestingComponentPage/>
    }
];
