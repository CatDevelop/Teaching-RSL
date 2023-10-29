import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC} from "react";
import {Typography} from "../../../../components/Typography";
import styles from "./SocialBlockElement.module.css";

type Props = Readonly<{
    label: string;
    icon: string;
    onClick: () => void;
}>

/**
 * Социальная сеть для входа
 */
export const SocialBlockElement: FC<Props> = typedMemo(function SocialBlock(props){
    return (
        <button className={styles.socialBlockElement} onClick={props.onClick}>
            <img src={props.icon} alt="Вк" className={styles.socialBlockElement__icon}/>
            <Typography variant="span" className={styles.socialBlockElement__name}>{props.label}</Typography>
        </button>
    )
})
