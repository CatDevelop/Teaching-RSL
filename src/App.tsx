import React from "react";
import './App.css';
import {HashRouter} from "react-router-dom";
import { RootRouter } from "./routes/RootRouter";

function MyApp() {
    return (
        <div className="App">
            <HashRouter>
                <RootRouter/>
            </HashRouter>
        </div>
    );
}

export default MyApp;
