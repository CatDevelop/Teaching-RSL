import React, {Suspense} from "react";
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {RootRouter} from "./routes/RootRouter";
import {QueryClientProvider} from "react-query";
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {Spinner} from "@nextui-org/react";
import 'react-toastify/dist/ReactToastify.css';
import {queryClient} from "core/config/queryClient";
import {AchievementListener} from "./features/achievement";
import {ToastContainer} from "react-toastify";

export default function MyApp() {
    return (
        <div className="App">
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <MantineProvider>
                        <BrowserRouter>
                            <Suspense fallback={<Spinner className="mainSpinner"/>}>
                                <RootRouter/>
                            </Suspense>
                            <ToastContainer
                                style={{borderRadius: "16px"}}
                                position="bottom-right"
                                autoClose={3000}
                                hideProgressBar
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss={false}
                                pauseOnHover
                                theme="light"
                            />
                            <div id="modal-portal"/>
                            <AchievementListener/>
                        </BrowserRouter>
                    </MantineProvider>
                </QueryClientProvider>
            </Provider>
        </div>
    );
}
