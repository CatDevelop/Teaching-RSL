import React, {FC, useCallback} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import styles from "./SideBarItem.module.css"
import clsx from "clsx";
import {NavLink, useNavigate} from "react-router-dom";
import {Typography} from "../Typography";

type Props = {
    item: {
        id: number,
        label: string,
        icon: React.JSX.Element,
        link: string
    },
    isActive: boolean,
};

export const SideBarItem: FC<Props> = typedMemo(function SideBarItem(props) {
    const navigate = useNavigate()

    return (
        <NavLink
            to={props.item.link}
            className={clsx(styles.sideBarItem__container, props.isActive && styles.sideBarItem_active)}
        >
            {props.item.icon}
            <Typography variant="h3" className={styles.sideBarItem__label}>
                {props.item.label}
            </Typography>
        </NavLink>
    );
})
