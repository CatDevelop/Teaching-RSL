import React from "react";
import './App.css';
import {HashRouter} from "react-router-dom";
import {RootRouter} from "./routes/RootRouter";
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';

function MyApp() {
    return (
        <div className="App">
            <MantineProvider>
                <HashRouter>
                    <RootRouter/>
                </HashRouter>
            </MantineProvider>
        </div>
    );
}

export default MyApp;
