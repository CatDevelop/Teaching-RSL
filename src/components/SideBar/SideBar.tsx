import React, {FC} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import styles from "./SideBar.module.css"
import Logo from "../../assets/images/Logo.svg";
import {SideBarItem} from "../SideBarItem";
import {LKIcon} from "../../assets/images/LKIcon"
import {LearningIcon} from "../../assets/images/LearningIcon"
import {TrainingIcon} from "../../assets/images/TrainingIcon"
import {DictionaryIcon} from "../../assets/images/DictionaryIcon"
import {ExitIcon} from "../../assets/images/ExitIcon"
import {Card} from "../Card";
import {useLocation} from "react-router-dom";

/**
 * Боковое меню
 */
export const SideBar: FC = typedMemo(function SideBar() {
    const location = useLocation();

    const items = [
        {
            id: 0,
            label: "Личный кабинет",
            icon: LKIcon,
            link: "/profile"
        },
        {
            id: 1,
            label: "Обучение",
            icon: LearningIcon,
            link: "/learning"
        },
        {
            id: 2,
            label: "Тренировки",
            icon: TrainingIcon,
            link: "/training"
        },
        {
            id: 3,
            label: "Словарь",
            icon: DictionaryIcon,
            link: "/dictionary/by-theme"
        },
    ]

    const exitItem = {
        id: 4,
        label: "Выйти",
        icon: ExitIcon,
        link: "/"
    }

    console.log(location)

    return (
        <Card className={styles.sidebar__container}>
            <img src={Logo} width={218} alt={"Логотип"} className={styles.sidebar__logo}/>
            <div>
                {
                    items.map(item => {
                        return <SideBarItem item={item} isActive={location.pathname === item.link}/>
                    })
                }
            </div>

            <SideBarItem item={exitItem} isActive={false}/>
        </Card>
    );
})
