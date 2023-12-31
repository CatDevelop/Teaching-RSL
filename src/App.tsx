import React from "react";
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {RootRouter} from "./routes/RootRouter";
import {QueryClientProvider, QueryClient} from "react-query";
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import { Provider } from "react-redux";
import { store } from "./store/store";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
        },
    },
})

export default function MyApp() {
    return (
        <div className="App">
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <MantineProvider>
                        <BrowserRouter>
                            <RootRouter/>
                        </BrowserRouter>
                    </MantineProvider>
                </QueryClientProvider>
            </Provider>
        </div>
    );
}
