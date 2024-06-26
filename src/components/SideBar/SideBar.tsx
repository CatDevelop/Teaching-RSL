import React, {FC} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import styles from "./SideBar.module.css"
import {ReactComponent as Logo} from "../../assets/images/LogoMonochrome.svg";
import {SideBarItem} from "../SideBarItem";
import {ExitIcon} from "../../assets/images/ExitIcon"
import {Card} from "../Card";
import {Link, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {LKIcon} from "../../assets/images/LKIcon"
import {LearningIcon} from "../../assets/images/LearningIcon"
import {TrainingIcon} from "../../assets/images/TrainingIcon"
import {DictionaryIcon} from "../../assets/images/DictionaryIcon"
import {logout} from "../../store/auth/authSlice";
import {useQuery, useQueryClient} from "react-query";
import {UserService} from "api/services/user";
import {Typography} from "components/Typography";
import {Button} from "components/Button";

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
        label: "Практика",
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
    const queryClient = useQueryClient();
    const location = useLocation();
    const dispatch = useDispatch()
    const {data: user} = useQuery('user-welcome-info', UserService.getWelcomeUserInfo)

    const exitItem = {
        id: 4,
        label: "Выйти",
        icon: ExitIcon,
        link: "/",
        onClick: () => {
            dispatch(logout())
            queryClient.clear();
        }
    }

    return (
        <Card className={styles.sidebar__container}>
            <Logo width={218} className={styles.sidebar__logo}/>
            <div>
                {
                    navigationItems.map(item => {
                        return (
                            <SideBarItem
                                item={item}
                                key={item.id}
                                isActive={location.pathname.split("/")[1] === item.link.split("/")[1]}
                            />
                        )
                    })
                }
            </div>

            <div className={styles.sidebar__footer}>
                <Typography
                    variant="p"
                    className={styles.sidebar__username}
                >
                    {user!.lastName} {user!.firstName}
                    </Typography>
                <Button
                    variant="light"
                    as={Link}
                    to="/profile/settings"
                    className={styles.sidebar__toSettingsBtn}
                >
                    Редактировать профиль
                    </Button>
                <SideBarItem item={exitItem} isActive={false}/>
            </div>
        </Card>
    );
})
