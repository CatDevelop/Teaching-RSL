import { FC } from "react";
import clsx from "clsx";
import { typedMemo } from "../../core/utils/typedMemo";
import TickCircle from '../../assets/images/TickCircle.svg'
import CloseCircle from '../../assets/images/CloseCircle.svg'
import styles from "./TaskContinue.module.css";
import { Button } from "../Button";

type Props = Readonly<{
    continue: () => void;
    isRightAnswer: boolean;
    rightAnswer: string;
}>

/** Task continue panel. */
export const TaskContinue: FC<Props> = typedMemo(function TaskContinue(props){
    return (
        <div className={clsx(styles['task-continue'],  !props.isRightAnswer && styles['task-continue_incorrectly'])}>
            {props.isRightAnswer ?
                <>
                    <div className={styles['task-continue__result']}>
                        <img src={TickCircle} alt="You answered correctly" className={styles['task-continue__icon']} />
                        <p className={clsx(styles['task-continue__title'], styles['task-continue__text-block'])}>Вы отлично справились!</p> 
                    </div>
                    <Button color="primary" onClick={props.continue}>Далее</Button>
                </> :
                <>
                    <div className={styles['task-continue__result']}>
                        <img src={CloseCircle} alt="You answered incorrectly" className={styles['task-continue__icon']} />
                        <div className={styles['task-continue__text-block']}>
                            <p className={styles['task-continue__title']}>Правильный ответ:</p> 
                            <p className={styles['task-continue__description']}>{props.rightAnswer}</p> 
                        </div>
                    </div>
                    <Button color="danger" onClick={props.continue}>Далее</Button>
                </>   
        }
        </div>
    )
});
