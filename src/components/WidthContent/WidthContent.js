import React from 'react';
import s from './WidthContent.module.css';
function WidthContent ({children}) {
    return (
        <div className={s.container}>
            <div className={s.app}>
                {children}
            </div>
        </div>
    )
}

export default WidthContent;
