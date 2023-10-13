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

type Props = {
    currentPage: string,
};

export const SideBar: FC<Props> = typedMemo(function SideBar(props) {
    const items = [
        {
            id: 0,
            label: "Личный кабинет",
            icon: LKIcon,
            link: "/"
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

    const exitItem = {
        id: 4,
        label: "Выйти",
        icon: ExitIcon,
        link: "/"
    }

    return (
        <Card className={styles.sidebar__container}>
            <img src={Logo} width={218} alt={"Логотип"} className={styles.sidebar__logo}/>
            <div>
                {
                    items.map(item => {
                        return <SideBarItem item={item} isActive={props.currentPage === item.link}/>
                    })
                }
            </div>

            <SideBarItem item={exitItem} isActive={false}/>
        </Card>
    );
})
