import React, {FC, useCallback} from "react";
import styles from "./HomePage.module.css";
import {useNavigate} from "react-router-dom";
import {Typography} from "../../../../components/Typography";
import {typedMemo} from "../../../../core/utils/typedMemo";
import LogoStand from '../../../../assets/images/LogoMonochrome.svg'
import {Facts} from "../../components/facts";
import {Gradient} from "../../../../components/Gradient/Gradient";


/**
 * Главная страница (Лендинг)
 */
export const HomePage: FC = typedMemo(function HomePage() {
    const navigate = useNavigate();

    const toProfile = useCallback(() => navigate("/profile"), [navigate])

    return (
        <div className={styles.homePage} onClick={toProfile}>
            <Gradient className={styles.homePage__gradient}/>

            <img className={styles.homePage__logo} src={LogoStand} alt="Логотип"/>
            <div className={styles.homePage__factsContainer}>
                <Facts className={styles.homePage__facts}/>
            </div>

            <Typography
                variant="p"
                className={styles.homePage__tap}
            >
                Нажмите на экран, чтобы продолжить
            </Typography>
        </div>
    )
})
