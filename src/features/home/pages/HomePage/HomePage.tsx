import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import styles from "./HomePage.module.css";
import {useNavigate} from "react-router-dom";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {ReactComponent as Logo} from "../../../../assets/images/LogoMonochrome.svg";
import {ReactComponent as HomePageHero} from "../../../../assets/images/HomePageHero.svg";
import {Button} from "../../../../components/Button";
import {Facts} from "../../components/facts";
import {Typography} from "../../../../components/Typography";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {ReactComponent as Test1} from "../../../../assets/images/Test1.svg";
import { useWindowScroll } from '@mantine/hooks';
import {useRive, useStateMachineInput} from "@rive-app/react-canvas";
import clsx from "clsx";

/**
 * Главная страница (Лендинг)
 */
export const HomePage: FC = typedMemo(function HomePage() {
    const navigate = useNavigate();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth)

    const r = useRef(null)
    const r2 = useRef(null)
    const [scroll, scrollTo] = useWindowScroll();
    const [isFixed, setIsFixed] = useState(false)

    const toSignup = useCallback(() => navigate("/signup"), [])
    const toSignin = useCallback(() => navigate("/signin"), [])
    const toLearning = useCallback(() => navigate("/learning"), [])

    const { rive, RiveComponent } = useRive({
        src: './Test.riv',
        stateMachines: "Base",
        autoplay: true,
    });

    const levelInput = useStateMachineInput(rive, "Base", "Type");

    useEffect(() => {
        // @ts-ignore
        if(levelInput)
            levelInput.value = 0
    }, []);


    useEffect(() => {
        // @ts-ignore
        const parent = r.current && r.current.getBoundingClientRect();
        // @ts-ignore
        const parent2 = r2.current && r2.current.getBoundingClientRect();
        // @ts-ignore
        if (parent?.top <= 60 && parent2?.top >= 150) {
            setIsFixed(true)
            console.log(levelInput)
            if(levelInput)
                levelInput.value = 1
            console.log(123)
        } else {
            setIsFixed(false)
            if(levelInput)
                levelInput.value = 0
        }
        // @ts-ignore
        if(parent?.top > 60)
            setIsFixed(false)

    }, [scroll]);


    return (
        <div className={styles.homePage}>
            <div className={styles.header__container}>
                <div className={styles.header}>
                    <Logo width={200} className={styles.header__logo}/>

                    <div className={styles.header__buttons}>
                        {isAuth &&
                            <Button variant="solid" color="primary" onClick={toLearning}>
                                Перейти в сервис
                            </Button>
                        }
                        {!isAuth && <>
                            <Button variant="light" color="primary" className={styles.header__buttons__registration} onClick={toSignup}>
                                Зарегистрироваться
                            </Button>
                            <Button variant="solid" color="primary" onClick={toSignin}>
                                Войти
                            </Button>
                        </>}
                    </div>
                </div>
            </div>

            <div className={styles.homePage__heroContainer}>
                <div className={styles.homePage__hero__imageContainer}>
                    <HomePageHero className={styles.homePage__hero__image}/>
                </div>
                <div className={styles.homePage__hero__contentContainer}>
                    <Typography variant="h1" className={styles.homePage__hero__title}>
                        Добро пожаловать<br/> в мир жестового языка!
                    </Typography>
                    <Typography variant="h3" className={styles.homePage__hero__description}>
                        Изучайте, закрепляете и практикуйтесь <br/>с нашим самоучителем
                    </Typography>

                    <Button color="primary" className={styles.homePage__hero__button} onClick={toLearning}>
                        Начать изучение
                    </Button>
                </div>
            </div>

            <div className={styles.homePage__factsContainer}>
                <Facts className={styles.homePage__facts}/>
            </div>

            <div className={styles.homePage__featuresContainer}>

                <div className={styles.homePage__features__items}>
                    <div className={styles.homePage__features__item} ref={r}>
                        <div className={styles.homePage__features__item__text}>
                            <Typography variant="h2" className={styles.homePage__features__item__text__title}>
                                Изучай теорию
                            </Typography>
                            <Typography variant="p" className={styles.homePage__features__item__text__description}>
                                Изучай теорию
                            </Typography>
                        </div>
                        <div className={styles.homePage__features__item__image}>
                            <div className={styles.homePage__features__item__imageRive}>
                                <RiveComponent className={clsx(styles.homePage__features__rive, isFixed && styles.homePage__features__rive_fixed)}/>
                            </div>
                            {/*<Test1 width={900} style={{*/}
                            {/*    position: isFixed ? "fixed" : undefined, top: "50px", right: "118px"}}/>*/}
                        </div>
                    </div>

                    <div className={styles.homePage__features__item} ref={r2}>
                        <div className={styles.homePage__features__item__text}>
                            <Typography variant="h2" className={styles.homePage__features__item__text__title}>
                                Практикуйся
                            </Typography>
                            <Typography variant="p">
                                Изучай теорию
                            </Typography>
                        </div>
                        <div className={styles.homePage__features__item__image}>
                            <Test1 />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})
