import React from "react";
import styles from "./HomePage.module.css";
import {useNavigate} from "react-router-dom";
import Logo from "../../assets/images/Logo.svg";
import startLearningSVG from '../../assets/images/StartLearning.svg'
import startTrainingSVG from '../../assets/images/StartTraining.svg'
import {Typography} from "../../components/Typography";
import {Card} from "../../components/Card";
import MGPULogo from "../../assets/images/MGPULogo.svg";
import SberLogo from "../../assets/images/SberAI.png";
import PinCodeLogo from '../../assets/images/PinCodeLogo.svg';
import UrFULogo from '../../assets/images/UrFULogo.png';

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.homePage}>
            <img src={Logo} alt={"Логотип сервиса \"Изучение русского жестового языка\""} width={400}/>
            <div className={styles.homePage__links}>
                <div onClick={() => navigate("learning")}>
                    <Card className={styles.homePage__buttonContainer}>
                        <div className={styles.homePage__button__imageContainer}>
                            <img src={startLearningSVG} rel="preload" alt={"Перейти к обучению"}/>
                        </div>
                        <div className={styles.homePage__button__typographyContainer}>
                            <Typography variant={"h2"} className={styles.homePage__button__title}>
                                Изучить жесты
                            </Typography>
                            <Typography variant={"p"} className={styles.homePage__button__description}>
                                Изучите 5 базовых жестов с помощью
                                наших интерактивных заданий
                            </Typography>
                        </div>
                    </Card>
                </div>

                <div onClick={() => navigate("training")}>
                    <Card className={styles.homePage__buttonContainer}>
                        <div className={styles.homePage__button__imageContainer}>
                            <img src={startTrainingSVG} rel="preload" alt={"Перейти к тренировкам"}/>
                        </div>
                        <div className={styles.homePage__button__typographyContainer}>
                            <Typography variant={"h2"} className={styles.homePage__button__title}>
                                Проверить свои знания
                            </Typography>
                            <Typography variant={"p"} className={styles.homePage__button__description}>
                                Проверьте своё умение общаться на РЖЯ с нашей моделью распознавания
                            </Typography>
                        </div>
                    </Card>
                </div>

            </div>

            <div className={styles.homePage__logosContainer}>
                <Card className={styles.homePage__logos}>
                    <img src={MGPULogo} alt={"МГПУ"} width={110}/>
                    <img src={SberLogo} alt={"SberAI"} width={200}/>
                    <img src={PinCodeLogo} alt={"ПИН-КОД"} width={60}/>
                    <img src={UrFULogo} alt={"УрФУ"} width={66}/>
                </Card>
            </div>
        </div>
    )
}
