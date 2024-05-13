import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "./LearningResultPage.module.css";
import {Page} from "../../../../components/Page";
import {ReactComponent as Logo} from "../../../../assets/images/Logo.svg"
import {Button} from "../../../../components/Button";
import {useNavigate} from "react-router-dom";
import {PageContent} from "../../../../components/PageContent";
import {getFireworks} from "../../../../core/utils/explodeFireworks";
import {ExitConfirmation} from "../../../../components/ExitConfirmation";
import {Typography} from "../../../../components/Typography";
import {ReactComponent as ResultLearning} from "../../../../assets/images/ResultLearningImage.svg"
import {normalizeCountForm} from "../../../../core/utils/normalizeCountForm";
import {Card} from "../../../../components/Card";

/**
 * Результаты уровня
 */
export const LearningResultPage: FC = typedMemo(function LearningResultPage() {
    const queryParams = new URLSearchParams(window.location.search)
    const wordsCount = parseInt(queryParams.get("count") || "0")

    const navigate = useNavigate()
    const fireworks = getFireworks(3000)

    useEffect(() => {
        fireworks()
    }, []);

    const [exitModalIsOpen, setExitModalIsOpen] = useState(false)

    const openExitModal = useCallback(() => setExitModalIsOpen(true), [setExitModalIsOpen])
    const toLearningPage = useCallback(() => navigate("/learning"), [navigate])

    return (
        <Page>
            <ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen} onExit={toLearningPage}/>
            <PageContent className={styles.learningResult}>
                <div className={styles.learningResult__logoContainer} onClick={openExitModal}>
                    <Logo width={218}/>
                </div>

                <Card className={styles.learningResult__card}>
                    <div className={styles.learningResult__contentContainer}>
                        <div className={styles.learningResult__result}>
                            <ResultLearning className={styles.learningResult__resultImage}/>
                            <Typography variant="p" className={styles.learningResult__resultDescription}>
                                You have learned {wordsCount} signs.<br/>
                                Now you can move on to the next step <br/>
                                and try them in practice.
                            </Typography>
                            <Button variant={"solid"} color={"primary"} onClick={toLearningPage}>
                               Go to menu
                            </Button>
                        </div>
                    </div>
                </Card>
            </PageContent>
        </Page>
    )
})
