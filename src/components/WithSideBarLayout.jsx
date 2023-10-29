import React from 'react';
import {Outlet} from 'react-router-dom';
import {WithSideBarContent} from "./WithSideBarContent";

const WithSideBarLayout = () => {
    return (
        <div>
            <WithSideBarContent>
                <Outlet/>
            </WithSideBarContent>
        </div>
    );
};

export default WithSideBarLayout;
