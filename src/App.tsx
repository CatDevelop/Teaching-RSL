import React, { Suspense } from "react";
import './App.css';
import {HashRouter} from "react-router-dom";
import { RootRouter } from "./routes/RootRouter";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
})

function MyApp() {
    return (
        <QueryClientProvider client={queryClient}>
            <HashRouter>
                <Suspense fallback={"Loading"}>
                    <RootRouter/>
                </Suspense>
            </HashRouter>
        </QueryClientProvider>
    );
}

export default MyApp;
