import React, {FC, useMemo} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import styles from "./SideBar.module.css"
import Logo from "../../assets/images/Logo.svg";
import {SideBarItem} from "../SideBarItem";
import {ExitIcon} from "../../assets/images/ExitIcon"
import {Card} from "../Card";
import {useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { getNavigationItems } from "./utils";

/**
 * Боковое меню
 */
export const SideBar: FC = typedMemo(function SideBar() {
    const location = useLocation();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const navigationItems = useMemo(() => getNavigationItems(isAuth), [isAuth]);

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
                    navigationItems.map(item => {
                        return <SideBarItem item={item} isActive={location.pathname === item.link}/>
                    })
                }
            </div>

            <SideBarItem item={exitItem} isActive={false}/>
        </Card>
    );
})
