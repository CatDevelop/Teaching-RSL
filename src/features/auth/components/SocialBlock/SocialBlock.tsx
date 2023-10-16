import { typedMemo } from "../../../../core/utils/typedMemo";
import React, { FC } from "react";
import VK from "../../../../assets/images/VK.svg"
import Yandex from "../../../../assets/images/Yandex.svg"
import { Typography } from "../../../../components/Typography";
import styles from "./SocialBlock.module.css";

type Props = Readonly<{
    label: string;
    onVKClick: () => void;
    onYandexClick: () =>void;
}>

export const SocialBlock: FC<Props> = typedMemo(function SocialBlock(props){
    return (
        <div className={styles.socialBlock}>
            <Typography variant="span" className={styles.socialBlock__label}>{props.label}</Typography>

           <div className={styles.socialBlock__socialButtons}>
            <button className={styles.socialBlock__social} onClick={props.onVKClick}>
                <img src={VK} alt="Вк" className={styles.socialBlock__socialIcon}/>
                <Typography variant="span" className={styles.socialBlock__socialName}>Вконтакте</Typography>
            </button>
            <button className={styles.socialBlock__social} onClick={props.onYandexClick}>
                <img src={Yandex} alt="Yandex" className={styles.socialBlock__socialIcon}/>
                <Typography variant="span" className={styles.socialBlock__socialName}>Яндекс</Typography>
            </button>
           </div>
        </div>
    )
})