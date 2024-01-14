import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./TrainingResultPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/Logo.svg"
import {Button} from "../../../../components/Button";
import {Typography} from "../../../../components/Typography";
import {useNavigate} from "react-router-dom";
import {PageContent} from "../../../../components/PageContent";
import {getFireworks} from "../../../../core/utils/explodeFireworks";
import {ExitConfirmation} from "../../../../components/ExitConfirmation";
import {BySberAI} from "../../../../components/BySberAI";
import ResultImage from "../../../../assets/images/ResultTrainingImage.svg"

export const TrainingResultPage: FC = typedMemo(function TrainingPage() {
    const navigate = useNavigate()
    const fireworks = getFireworks(3000)

    const [exitModalIsOpen, setExitModalIsOpen] = useState(false)

    const openExitModal = useCallback(() => setExitModalIsOpen(true), [setExitModalIsOpen])
    const toTrainingPage = useCallback(() => navigate("/training"), [navigate])

    useEffect(() => {
        fireworks()
    }, [fireworks]);

    const getTaskResult = useCallback((countAllWords: number, countSkippedWords: number) => {
        return 100 - Math.floor((countSkippedWords) / countSkippedWords * 100)
    }, [])

    return (
        <Page>
            <ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen} onExit={toTrainingPage}/>
            <PageContent className={styles.trainingTask}>
                <div className={styles.trainingTask__logoContainer} onClick={openExitModal}>
                    <img src={Logo} rel="preload" alt={"Логотип"} width={218}/>
                </div>
                <div className={styles.trainingTask__contentContainer}>
                    <div className={styles.trainingTask__result}>
                        <img
                            src={ResultImage}
                            rel="preload"
                            className={styles.trainingTask__resultImage}
                            alt="Иконка результата"
                        />
                        <Typography variant="h2" className={styles.trainingTask__resultTitle}>
                            Поздравляем, вы освоили несколько новых жестов!<br/>
                            Благодарим за участие!
                        </Typography>
                        <div className={styles.trainingTask__result__container}>
                            <BySberAI/>
                        </div>
                    </div>
                </div>

                <div className={styles.trainingTask__taskContinueContainer}>
                    <Button
                        size={'lg'}
                        color="primary"
                        onClick={toTrainingPage}
                    >
                        В главное меню
                    </Button>
                </div>
            </PageContent>
        </Page>
    )
})
