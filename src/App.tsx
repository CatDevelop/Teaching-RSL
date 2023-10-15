import React, { Suspense } from "react";
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {RootRouter} from "./routes/RootRouter";
import {QueryClientProvider, QueryClient} from "react-query";
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
})

function MyApp() {
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <MantineProvider>
                    <BrowserRouter>
                        <Suspense fallback={"Loading"}>
                            <RootRouter/>
                        </Suspense>
                    </BrowserRouter>
                </MantineProvider>
            </QueryClientProvider>
        </div>
    );
}

export default MyApp;
