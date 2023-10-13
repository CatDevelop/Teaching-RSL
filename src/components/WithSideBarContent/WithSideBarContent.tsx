import React, {FC, PropsWithChildren} from 'react';
import styles from './WithSideBarContent.module.css';
import {typedMemo} from "../../core/utils/typedMemo";

export const WithSideBarContent: FC<PropsWithChildren> = typedMemo(function WithSideBarContent(props) {
    return (
        <div className={styles.withSideBarContent}>
            <div className={styles.withSideBarContent__app}>
                {props.children}
            </div>
        </div>
    )
})
