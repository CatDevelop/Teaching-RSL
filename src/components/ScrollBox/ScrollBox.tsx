import React, { FC, PropsWithChildren } from "react";
import { typedMemo } from "../../core/utils/typedMemo";
import styles from "./ScrollBox.module.css";
import { Card } from "../Card";
import clsx from "clsx";
import { ComponentProps } from "../../core/models/ComponentProps";
import {ScrollShadow} from "@nextui-org/react";

type Props = PropsWithChildren & ComponentProps;

/** Scroll box.  */
export const ScrollBox: FC<Props> = typedMemo(function ScrollBox(props){
    return (
        <Card className={clsx(styles.container)}>
            <ScrollShadow size={20} className={clsx(styles.scrollBox, props.className)}>
                {props.children}
            </ScrollShadow>
        </Card>
    )
});
