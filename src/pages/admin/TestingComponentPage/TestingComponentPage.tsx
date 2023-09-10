import React, { FC } from "react";
import { typedMemo } from "../../../core/utils/typedMemo";
import Logo from "../../../assets/images/Logo.svg";
import styles from "./TestingComponentPage.module.css";

export const TestingComponentPage: FC = typedMemo(function TestingComponentPage() {
    return (
        <div className={styles['centered-container']}>
            <img src={Logo} width={500} alt={"Логотип сервиса \"Изучение русского жестового языка\""}/>
        </div>
    )
});
