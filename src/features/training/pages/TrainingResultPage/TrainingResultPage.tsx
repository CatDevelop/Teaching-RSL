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
import {Card} from "../../../../components/Card";
import {normalizeCountForm} from "../../../../core/utils/normalizeCountForm";

export const TrainingResultPage: FC = typedMemo(function TrainingPage() {
    const queryParams = new URLSearchParams(window.location.search)
    const skipWordsCount = parseInt(queryParams.get("skiped") || "0")
    const allWordsCount = parseInt(queryParams.get("all") || "0")
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
            <PageContent className={styles.trainingResult}>
                <div className={styles.trainingTask__logoContainer} onClick={openExitModal}>
                    <img src={Logo} rel="preload" alt={"Логотип"} width={218}/>
                </div>
                <Card className={styles.trainingResult__contentContainer}>
                    <div className={styles.trainingResult__result}>
                        <img
                            src={ResultImage}
                            rel="preload"
                            className={styles.trainingResult__resultImage}
                            alt="Иконка результата"
                        />
                        <Typography variant="h2" className={styles.trainingResult__resultTitle}>
                            Конец тренировки
                        </Typography>
                        <Typography variant="p" className={styles.trainingResult__resultTitle}>
                            Ваш
                            результат {allWordsCount - skipWordsCount} из {allWordsCount} {normalizeCountForm(allWordsCount, ["жеста", 'жестов', 'жестов'])}
                        </Typography>

                    </div>

                    <Button
                        size={'lg'}
                        color="primary"
                        onClick={toTrainingPage}
                    >
                        В главное меню
                    </Button>

                    <div className={styles.trainingResult__result__container}>
                        <BySberAI/>
                    </div>
                </Card>

            </PageContent>
        </Page>
    )
})
