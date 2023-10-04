import React, {FC} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import {ComponentProps} from "../../core/models/ComponentProps";
import styles from "./SignVideo.module.css";
import clsx from "clsx";

type Props = ComponentProps & Readonly<{
    src: string;
}>

/** Видео жеста. */
export const SignVideo: FC<Props> = typedMemo(function SignVideo(props) {
    return (
        <div className={clsx(styles.signVideo, props.className)}>
            <video
                className={styles.signVideo__video}
                src={props.src}
                autoPlay
                loop
                muted
            />
        </div>
    )
});
