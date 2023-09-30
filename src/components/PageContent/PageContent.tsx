import React, { FC, PropsWithChildren } from "react";
import { typedMemo } from "../../core/utils/typedMemo";
import clsx from "clsx";
import { ComponentProps } from "../../core/models/ComponentProps";
import styles from "./PageContent.module.css";

type Props = PropsWithChildren & ComponentProps;

/** Page content. */
export const PageContent: FC<Props> = typedMemo(function PageContent({
    className,
    children,
}){
    return (
        <div className={clsx(styles.pageContent, className)}>
            {children}
        </div>
    )
})