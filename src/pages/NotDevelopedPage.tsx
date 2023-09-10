import React from "react";
import {useNavigate} from "react-router-dom";
import s from './Pages.module.css'
import {Button} from "@nextui-org/react";
import Logo from "../assets/images/Logo.svg";

export const NotDevelopedPage = () => {
    const navigate = useNavigate()
    return (
        <div className={s.centeredContainer}>
            <img src={Logo} width={500} alt={"Логотип сервиса \"Изучение русского жестового языка\""}/>
            <div className={s.errorPage_container}>
                <div>
                    <h1 className={s.errorPage_header}>В разработке</h1>
                    <p className={s.errorPage_description}>
                        Извините, данный раздел находиться в разработке
                    </p>
                </div>

                <Button color="primary" variant="solid" onClick={() => navigate("/")}>
                    На главную
                </Button>
            </div>
        </div>
    )
}
