import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./HomePage.module.css";
import {useNavigate} from "react-router-dom";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {ReactComponent as Logo} from "../../../../assets/images/LogoMonochrome.svg";
import {ReactComponent as LogoShort} from "../../../../assets/images/LogoShort.svg";
import {ReactComponent as HomePageHero} from "../../../../assets/images/HomePageHero.svg";
import {Button} from "../../../../components/Button";
import {Facts} from "../../components/facts";
import {Typography} from "../../../../components/Typography";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {useInViewport, useWindowScroll} from '@mantine/hooks';
import {useRive, useStateMachineInput} from "@rive-app/react-canvas";
import clsx from "clsx";
import {UserSecretService} from "../../../../api/services/userSecret";
import {login} from "../../../../store/auth/authSlice";

/**
 * Главная страница (Лендинг)
 */
export const HomePage: FC = typedMemo(function HomePage() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth)

    const {ref: featureTitleRef1, inViewport: featureTitle1InViewport} = useInViewport();
    const {ref: featureRef1, inViewport: feature1InViewport} = useInViewport();
    const {ref: featureTitleRef2, inViewport: featureTitle2InViewport} = useInViewport();
    const {ref: featureRef2, inViewport: feature2InViewport} = useInViewport();
    const {ref: featureTitleRef3, inViewport: featureTitle3InViewport} = useInViewport();
    const {ref: featureRef3, inViewport: feature3InViewport} = useInViewport();

    const [scroll, scrollTo] = useWindowScroll();
    const [isFixed, setIsFixed] = useState(false)
    const [isTop, setIsTop] = useState(true)

    const toSignup = useCallback(() => navigate("/signup"), [])
    const toSignin = useCallback(() => navigate("/signin"), [])
    const toLearning = useCallback(() => navigate("/learning"), [])

    const {rive, RiveComponent} = useRive({
        src: './Test.riv',
        stateMachines: "Base",
        autoplay: true,
    });

    const levelInput = useStateMachineInput(rive, "Base", "Type");

    useEffect(() => {
        if (UserSecretService.hasToken())
            dispatch(login());
        // @ts-ignore
        if (levelInput)
            levelInput.value = 0
    }, []);


    useEffect(() => {
        // @ts-ignore
        const featureTitle1 = featureTitleRef1.current && featureTitleRef1.current.getBoundingClientRect();
        const feature1 = featureRef1.current && featureRef1.current.getBoundingClientRect();
        // @ts-ignore
        const featureTitle2 = featureTitleRef2.current && featureTitleRef2.current.getBoundingClientRect();
        // @ts-ignore
        const featureTitle3 = featureTitleRef3.current && featureTitleRef3.current.getBoundingClientRect();
        const feature3 = featureRef3.current && featureRef3.current.getBoundingClientRect();

        // @ts-ignore
        if (feature1?.top <= 90 && feature3?.top >= 60) {
            setIsFixed(true)
            if (levelInput)
                levelInput.value = 0
        } else {
            setIsFixed(false)
            if (levelInput)
                levelInput.value = 0
        }
        // @ts-ignore
        if (feature1?.top > 90)
            setIsFixed(false)

        if (feature3?.top <= 60)
            setIsTop(false)
        else
            setIsTop(true)


        if (featureTitle1InViewport)
            // @ts-ignore
            levelInput.value = 0
        else if (featureTitle2InViewport)
            // @ts-ignore
            levelInput.value = 1
        else if (featureTitle3InViewport)
            // @ts-ignore
            levelInput.value = 2

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
                            <Button variant="light" color="primary" className={styles.header__buttons__registration}
                                    onClick={toSignup}>
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

            <Typography variant="h1" className={styles.homePage__features__title}>
                Наши возможности
            </Typography>
            <div className={styles.homePage__featuresContainer}>
                <div className={styles.homePage__features__items}>
                    <div className={styles.homePage__features__item} ref={featureRef1}>
                        <div className={styles.homePage__features__item__text}>
                            <Typography variant="h2" className={styles.homePage__features__item__text__title}
                                        ref={featureTitleRef1}>
                                Изучай теорию
                            </Typography>
                            <Typography variant="p" className={styles.homePage__features__item__text__description}>
                                Смотри, как показывают жесты профессиональные сурдопереводчики и запоминай их
                            </Typography>
                        </div>
                    </div>

                    <div className={styles.homePage__features__item} ref={featureRef2}>
                        <div className={styles.homePage__features__item__text}>
                            <Typography variant="h2" className={styles.homePage__features__item__text__title}
                                        ref={featureTitleRef2}>
                                Закрепляй
                            </Typography>
                            <Typography variant="p" className={styles.homePage__features__item__text__description}>
                                Проходи тесты разных типов для закрепления материала
                            </Typography>
                        </div>
                    </div>
                    <div className={styles.homePage__features__item} ref={featureRef3}>
                        <div className={styles.homePage__features__item__text}>
                            <Typography variant="h2" className={styles.homePage__features__item__text__title}
                                        ref={featureTitleRef3}>
                                Практикуйся
                            </Typography>
                            <Typography variant="p" className={styles.homePage__features__item__text__description}>
                                Показывай жесты в камеру - наша система распознает их и даст обратную связь
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={styles.homePage__features__item__image} style={{alignItems: isTop ? "start" : "end"}}>
                    <div className={styles.homePage__features__item__imageRive}>
                        <RiveComponent
                            className={clsx(styles.homePage__features__rive, isFixed && styles.homePage__features__rive_fixed)}/>
                    </div>
                </div>
            </div>

            <div className={styles.end}>
                <LogoShort width={100} className={styles.end__logo}/>
                <Typography variant="p" className={styles.end__description}>
                    Дарим свободу выражения <br/> в каждом жесте
                </Typography>

                <Button color="primary" className={styles.end__button} onClick={toLearning}>
                    Начать изучение
                </Button>
            </div>
        </div>
    )
})
