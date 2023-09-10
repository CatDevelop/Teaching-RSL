import React from "react";
import s from "./Pages.module.css";
import {Button} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import Logo from "../assets/images/Logo.svg";

export const HomePage = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <div className={s.centeredContainer}>
                <img src={Logo} width={500} alt={"Логотип сервиса \"Изучение русского жестового языка\""}/>
                <div className={s.homePage_buttons}>
                    <Button color="primary"
                            variant="solid"
                            fullWidth={true}
                            onClick={() => navigate("learning")}
                    >
                        Обучение
                    </Button>
                    <Button color="primary"
                            variant="solid"
                            fullWidth={true}
                            onClick={() => navigate("testing")}
                    >
                        Тренировки
                    </Button>
                    <Button color="primary" variant="solid" fullWidth={true}  onClick={() => navigate("admin/testing-component")}>
                        Тестирование компонентов
                    </Button>
                </div>
            </div>
        </div>
    )
}
