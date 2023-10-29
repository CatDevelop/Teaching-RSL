import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC} from "react";
import {Typography} from "../../../../components/Typography";
import styles from "./SocialBlock.module.css";
import {SocialBlockElement} from "../SocialBlockElement";

type Props = Readonly<{
    label: string;
    links: {
        label: string,
        icon: string,
        onClick: () => void,
    }[];
}>

/**
 * Социальные сети для входа
 */
export const SocialBlock: FC<Props> = typedMemo(function SocialBlock(props) {
    return (
        <div className={styles.socialBlock}>
            <Typography variant="span" className={styles.socialBlock__label}>{props.label}</Typography>
            <div className={styles.socialBlock__socialButtons}>
                {
                    props.links.map(link => {
                        return <SocialBlockElement label={link.label} icon={link.icon} onClick={link.onClick}/>
                    })
                }
                {/*<button className={styles.socialBlock__social} onClick={props.onVKClick}>*/}
                {/*    <img src={VK} alt="Вк" className={styles.socialBlock__socialIcon}/>*/}
                {/*    <Typography variant="span" className={styles.socialBlock__socialName}>Вконтакте</Typography>*/}
                {/*</button>*/}
                {/*<button className={styles.socialBlock__social} onClick={props.onYandexClick}>*/}
                {/*    <img src={Yandex} alt="Yandex" className={styles.socialBlock__socialIcon}/>*/}
                {/*    <Typography variant="span" className={styles.socialBlock__socialName}>Яндекс</Typography>*/}
                {/*</button>*/}
            </div>
        </div>
    )
})
