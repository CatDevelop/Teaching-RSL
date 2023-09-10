import React, { FC } from "react";
import { typedMemo } from "../../../core/utils/typedMemo";
import Logo from "../../../assets/images/Logo.svg";
import styles from "./TestingComponentPage.module.css";
import { Button } from "../../../components/Button";

export const TestingComponentPage: FC = typedMemo(function TestingComponentPage() {
    return (
        <div className={styles['centered-container']}>
            <Button variant="faded">dawdaw</Button>
        </div>
    )
});
