import React from "react";
import './App.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import WelcomeLayout from "./components/WelcomeLayout";
import {HomePage} from "./pages/HomePage";
import {NotFoundPage} from "./pages/NotFoundPage";
import {NotDevelopedPage} from "./pages/NotDevelopedPage";


function MyApp() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route path='/'element={<WelcomeLayout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path='learning' element={<NotDevelopedPage/>}/>
                        <Route path='testing' element={<NotDevelopedPage/>}/>
                        <Route path='*' element={<NotFoundPage/>}/>
                    </Route>
                </Routes>
            </HashRouter>
        </div>
    );
}

export default MyApp;
