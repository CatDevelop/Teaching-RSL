import React, {Dispatch, FC, SetStateAction} from "react";
import clsx from "clsx";
import {typedMemo} from "../../core/utils/typedMemo";
import styles from "./ExitConfirmation.module.css";
import {Button} from "../Button";
import {ComponentProps} from "../../core/models/ComponentProps";
import {useNavigate} from "react-router-dom";
import {Typography} from "../Typography";

type Props = ComponentProps & Readonly<{
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>
}>

/** Подтверждение выхода из задания. */
export const ExitConfirmation: FC<Props> = typedMemo(function ExitConfirmation(props) {
    const navigate = useNavigate()

    if (!props.isOpen)
        return;

    return (
        <>
            <div className={styles.exitConfirmation__blur}/>
            <div className={clsx(styles.exitConfirmation__container, props.className)}>
                <div className={styles.exitConfirmation__contentContainer}>
                    <div>
                        <Typography variant={'h2'}>Действительно хотите выйти?</Typography>
                        <Typography variant={'p'} className={styles.exitConfirmation_description}>
                            Ваш результат не сохранится
                        </Typography>
                    </div>
                    <div className={styles.exitConfirmation__buttons}>
                        <Button
                            size={"lg"}
                            variant={"faded"}
                            onClick={() => props.setIsOpen(false)}
                        >
                            Остаться
                        </Button>
                        <Button
                            size={"lg"}
                            color="primary"
                            onClick={() => navigate("/")}
                        >
                            Выйти
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
});
