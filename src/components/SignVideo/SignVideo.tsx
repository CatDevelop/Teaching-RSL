import React, {FC} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import {ComponentProps} from "../../core/models/ComponentProps";
import styles from "./SignVideo.module.css";

type Props = ComponentProps & Readonly<{
    src: string;
}>

/** Видео жеста. */
export const SignVideo: FC<Props> = typedMemo(function SignVideo(props){
    return (
        <div className={styles.signVideo}>
            <video className={styles.signVideo__video} src={props.src} controls={false} autoPlay loop/>
        </div>
    )
});
