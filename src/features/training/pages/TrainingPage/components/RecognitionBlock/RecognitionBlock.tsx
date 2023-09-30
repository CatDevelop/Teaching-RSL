import {Card} from "../../../../../../components/Card";
import {typedMemo} from "../../../../../../core/utils/typedMemo";
import React, {FC, useEffect, useRef, useState} from "react";
import styles from "./RecognitionBlock.module.css";
import {Typography} from "../../../../../../components/Typography";
import {ComponentProps} from "../../../../../../core/models/ComponentProps";
import clsx from "clsx";
import io from "socket.io-client";
import {WebCamera} from "./WebCamera/WebCamera";

type Props = ComponentProps & Readonly<{
    text: string
}>

export const RecognitionBlock: FC<Props> = typedMemo(function RecognitionBlock(props) {
    const [signRecognizeText, setSignRecognizeText] = useState<string[]>([])

    const videoRef = useRef(null);
    let videoElement: any;

    let socket = io('ws://localhost:5000', {
        'reconnection': true,
        'reconnectionDelay': 500,
        'reconnectionAttempts': 100,
        // extraHeaders: {
        //     "ngrok-skip-browser-warning": "true"
        // }
    });

    socket.on("connect", () => {
        console.log("Connected to server");
    });

    socket.on("disconnect", () => {
        console.log("Disconnect");
    });

    socket.on("send_not_normalize_text", (text: string) => {
        console.log(text)
        setSignRecognizeText([...signRecognizeText, text])
    });


    async function startWebcam() {
        try {
            videoElement.srcObject = await navigator.mediaDevices.getUserMedia({video: {facingMode: "user"}});

            videoElement.addEventListener('play', () => {
                setInterval(() => {
                    canvas.width = videoElement.videoWidth;
                    canvas.height = videoElement.videoHeight;
                    context?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                    const image = canvas.toDataURL('image/jpeg');
                    socket.emit("data", image);
                }, 30); // Отправка каждый кадр (30 кадров в секунду)
            });
        } catch (error) {
            console.error('Error accessing webcam:', error);
        }
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    useEffect(() => {
        videoElement = document.getElementById('webcam');

        startWebcam();
    }, []);


    return (
        <Card className={clsx(styles.recognitionBlock, props.className)}>
            <div className={styles.recognitionBlock__titleContainer}>
                <Typography variant="span" className={styles.recognitionBlock__title}>
                    Покажите жест в камеру
                </Typography>
                <Typography variant="h2" className={styles.recognitionBlock__gesture}>
                    {props.text}
                </Typography>
            </div>


            <div className={styles.recognitionBlock__camera}>
                <WebCamera isClosing={false} ref={videoRef}/>
            </div>

            <div className={styles.recognitionBlock__recognizedContainer}>
                <Typography variant="h3" className={styles.recognitionBlock__recognized}>
                    Распознанные жесты
                </Typography>
                <div className={clsx(styles.recognitionBlock__recognizedWords)}>
                    {
                        signRecognizeText.slice(-15).map(word => {
                            return (
                                <Typography variant="span" className={clsx(styles.recognitionBlock__recognizedWord, word === props.text.toLowerCase() && styles.recognitionBlock__rightWord)}>
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
