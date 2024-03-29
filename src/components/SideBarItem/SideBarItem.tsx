import React, {FC} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import styles from "./SideBarItem.module.css"
import clsx from "clsx";
import {NavLink} from "react-router-dom";
import {Typography} from "../Typography";

type Props = {
    item: {
        id: number,
        label: string,
        icon: React.JSX.Element,
        link: string,
        onClick?: () => void
    },
    isActive: boolean,
};

export const SideBarItem: FC<Props> = typedMemo(function SideBarItem(props) {
    return (
        <NavLink
            to={props.item.link}
            onClick={props.item.onClick}
            className={clsx(styles.sideBarItem__container, props.isActive && styles.sideBarItem_active)}
        >
            {props.item.icon}
            <Typography variant="p" className={styles.sideBarItem__label}>
                {props.item.label}
            </Typography>
        </NavLink>
    );
})
