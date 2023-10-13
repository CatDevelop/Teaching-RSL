import React, {FC, useCallback} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import styles from "./SideBarItem.module.css"
import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import {Typography} from "../Typography";

type Props = {
    item: {
        id: number,
        label: string,
        icon: any,
        link: string
    },
    isActive: boolean,
};
export const SideBarItem: FC<Props> = typedMemo(function SideBarItem(props){
    const navigate = useNavigate()
    const handleClick = useCallback(() => navigate(props.item.link), [props.item.link])

    return (
        <div className={clsx(styles.sideBarItem__container, props.isActive && styles.sideBarItem_active)}
             onClick={handleClick}
        >
            {
                props.item.icon
            }
            {/*<img src={props.item.icon} alt={"Иконка"} className={styles.sideBarItem__icon}/>*/}
            <Typography variant="h3"
                        className={styles.sideBarItem__label}
            >
                {
                    props.item.label
                }
            </Typography>

        </div>
    );
})
