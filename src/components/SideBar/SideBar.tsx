import React, {FC, useMemo} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import styles from "./SideBar.module.css"
import Logo from "../../assets/images/Logo.svg";
import {SideBarItem} from "../SideBarItem";
import {ExitIcon} from "../../assets/images/ExitIcon"
import {Card} from "../Card";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "store/store";

import {LKIcon} from "../../assets/images/LKIcon"
import {LearningIcon} from "../../assets/images/LearningIcon"
import {TrainingIcon} from "../../assets/images/TrainingIcon"
import {DictionaryIcon} from "../../assets/images/DictionaryIcon"
import {logout} from "../../store/auth/authSlice";

/**
 * Навигационные ссылки
 */
export const navigationItems = [
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
        link: "/dictionary"
    },
]

/**
 * Боковое меню
 */
export const SideBar: FC = typedMemo(function SideBar() {
    const location = useLocation();
    console.log(location.pathname.split("/"))
    const dispatch = useDispatch()
    const exitItem = {
        id: 4,
        label: "Выйти",
        icon: ExitIcon,
        link: "/",
        onClick: () => dispatch(logout())
    }

    return (
        <Card className={styles.sidebar__container}>
            <img src={Logo} width={218} alt={"Логотип"} className={styles.sidebar__logo}/>
            <div>
                {
                    navigationItems.map(item => {
                        return (
                            <SideBarItem
                                item={item}
                                isActive={location.pathname.split("/")[1] === item.link.split("/")[1]}
                            />
                        )
                    })
                }
            </div>

            <SideBarItem item={exitItem} isActive={false}/>
        </Card>
    );
})
