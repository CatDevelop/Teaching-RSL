import s from './WebCamera.module.css'
import React from "react";
import classNames from 'classnames'

export const WebCamera = (props) => {
    return (
        <div style={{position: "relative"}} className={classNames(s.container, props.isClosing ? s.close : '')}>
            <video id="webcam" autoPlay style={{transform: 'scale(-1, 1)'}} className={s.container}></video>
        </div>

    )
}
