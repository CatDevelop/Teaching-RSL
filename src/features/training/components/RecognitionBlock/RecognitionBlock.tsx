import {Card} from "../../../../components/Card";
import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo, useRef, useState} from "react";
import styles from "./RecognitionBlock.module.css";
import {Typography} from "../../../../components/Typography";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import clsx from "clsx";
import io from "socket.io-client";
import {WebCamera} from "../WebCamera/WebCamera";
import {Spinner} from "@nextui-org/react";
import {Word} from "../../../../core/models/Word";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";

type Props = ComponentProps & Readonly<{
    word: Word;
    onSuccess: () => void;
    intervalID: TimeoutId | undefined;
    setIntervalID: Dispatch<SetStateAction<TimeoutId | undefined>>;
    signRecognizeText: string[]
    setSignRecognizeText: Dispatch<SetStateAction<string[]>>
}>

export const RecognitionBlock: FC<Props> = typedMemo(function RecognitionBlock(props){

    let videoElement: any;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    let socket = io('ws://localhost:5000', {
        'reconnection': true,
        'reconnectionDelay': 500,
        'reconnectionAttempts': 10,
    });

    socket.on("connect", () => {
        console.log("Connected to server");
    });

    socket.on("disconnect", () => {
        console.log("Disconnect");
    });

    socket.on("send_not_normalize_text", (text: string) => {
        console.log(text)
        props.setSignRecognizeText([...props.signRecognizeText, text])
    });

    const startWebcam = useCallback(async (addFrameSender: () => void) => {
        console.log("startWebcam")
        try {
            videoElement.srcObject = await navigator.mediaDevices.getUserMedia({video: {facingMode: "user"}});
            videoElement.addEventListener('play', addFrameSender);
        } catch (error) {
            console.error('Error accessing webcam:', error);
        }
    }, [videoElement])

    const addFrameSender = useCallback(() => {
        console.log("addFrameSender")
        let id = setInterval(() => {
            console.log('Send frame')
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            context?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            const image = canvas.toDataURL('image/jpeg');
            socket.emit("data", image);
        }, 30); // Отправка каждый кадр (30 кадров в секунду)
        props.setIntervalID(id)
    }, [context, canvas, socket, videoElement, props])


    useEffect(() => {
        videoElement = document.getElementById('webcam');

        startWebcam(addFrameSender);

        return () => {
            console.log('EEEEE')
            videoElement.removeEventListener('play', addFrameSender);
            clearInterval(props.intervalID)
        }
    }, []);


    useEffect(() => {
        if(props.signRecognizeText.includes(props.word.text.toLowerCase()))
            props.onSuccess()
    }, [props.signRecognizeText])


    return (
        <Card className={clsx(styles.recognitionBlock, props.className)}>
            <div className={styles.recognitionBlock__titleContainer}>
                <Typography variant="span" className={styles.recognitionBlock__title}>
                    Покажите жест в камеру
                </Typography>
                <Typography variant="h2" className={styles.recognitionBlock__gesture}>
                    {props.word.text}
                </Typography>
            </div>

            <div className={styles.recognitionBlock__camera}>
                <Spinner className={styles.recognitionBlock__cameraLoading}/>
                <WebCamera isClosing={false}/>
            </div>

            <div className={styles.recognitionBlock__recognizedContainer}>
                <Typography variant="h3" className={styles.recognitionBlock__recognized}>
                    Распознанные жесты
                </Typography>
                <div className={clsx(styles.recognitionBlock__recognizedWords)}>
                    {
                        props.signRecognizeText.slice(-15).map(word => {
                            return (
                                <Typography variant="span" className={clsx(styles.recognitionBlock__recognizedWord, word === props.word.text.toLowerCase() && styles.recognitionBlock__rightWord)}>
                                    {word}
                                </Typography>
                            )
                        })
                    }
                </div>
            </div>
        </Card>
    );
});
