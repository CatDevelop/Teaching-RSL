import React from 'react';
import {Outlet} from 'react-router-dom';
import WidthContent from "./WidthContent/WidthContent";

const HomeLayout = () => {
    return (
        <div>
            <WidthContent>
                <Outlet/>
            </WidthContent>
        </div>
    );
};

export default HomeLayout;
