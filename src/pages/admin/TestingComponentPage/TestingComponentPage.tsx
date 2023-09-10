import React, { FC } from "react";
import { typedMemo } from "../../../core/utils/typedMemo";
import styles from "./TestingComponentPage.module.css";

export const TestingComponentPage: FC = typedMemo(function TestingComponentPage() {
    return (
        <div className={styles['centered-container']}>
        </div>
    )
});
