import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, Suspense, useCallback, useEffect, useState} from "react";
import styles from "./LearningTaskPage.module.css";
import {Page} from "../../../../components/Page";
import Logo from "../../../../assets/images/Logo.svg"
import {Button} from "../../../../components/Button";
import {useNavigate, useParams} from "react-router-dom";
import {clsx} from "clsx";
import {PageContent} from "../../../../components/PageContent";
import {getFireworks} from "../../../../core/utils/explodeFireworks";
import {ExitConfirmation} from "../../../../components/ExitConfirmation";
import {StartLearning} from "../../components/StartLearning";
import {LearningHeader} from "../../components/LearningHeader";
import {LearningTaskBlock} from "../../components/LearningTaskBlock";
import {Spinner} from "@nextui-org/react";
import {Typography} from "../../../../components/Typography";
import ResultLearning from "../../../../assets/images/ResultLearningImage.svg"
import {Back} from "../../../../components/Back";
import useLearningLevel from "../../../../core/hooks/use-learning-level";
import {useMutation, useQuery} from "react-query";
import {LearningService} from "../../../../api/services/learning";
import {UserHistoryService} from "../../../../api/services/userHistory";


export const LearningTaskPage: FC = typedMemo(function LearningTaskPage() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate()
    const fireworks = getFireworks(3000)

    const levelController = useLearningLevel(id || '')

    // const levelController = {
    //     isLoading: false,
    //     level: {
    //         practiceCount: 4,
    //         tasks: [
    //             {
    //                 id: 0,
    //                 type: "theory",
    //                 task: {
    //                     wordId: "c220eaaf-b029-4f11-9cd8-d3ffc62e2ee9",
    //                     firstRepresentation: "Красный",
    //                     secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/4495.mp4"
    //                 }
    //             },
    //             {
    //                 id: 1,
    //                 type: "theory",
    //                 task: {
    //                     wordId: "9f1cbb39-60b2-4bae-bfa7-4c31b29b95cf",
    //                     firstRepresentation: "Оранжевый",
    //                     secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/349233.mp4"
    //                 }
    //             },
    //             {
    //                 id: 2,
    //                 type: "theory",
    //                 task: {
    //                     wordId: "d5bfca14-9367-414c-98b6-d7751c9739b4",
    //                     firstRepresentation: "Коричневый",
    //                     secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/7655.mp4"
    //                 }
    //             },
    //             {
    //                 id: 3,
    //                 type: "theory",
    //                 task: {
    //                     wordId: "fbcae8dd-9c1c-42f2-a6e5-f5007047b17e",
    //                     firstRepresentation: "Фиолетовый",
    //                     secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/14691.mp4"
    //                 }
    //             },
    //             {
    //                 id: 4,
    //                 type: "theory",
    //                 task: {
    //                     wordId: "62f341ec-e4a3-4500-adb9-f9a52ce81a21",
    //                     firstRepresentation: "Зелёный",
    //                     secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/5717.mp4"
    //                 }
    //             },
    //             {
    //                 id: 5,
    //                 type: "practice",
    //                 task: {
    //                     type: "SelectWordByGif",
    //                     rightSelect: {
    //                         wordId: "c220eaaf-b029-4f11-9cd8-d3ffc62e2ee9",
    //                         firstRepresentation: "Красный",
    //                         secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/4495.mp4"
    //                     },
    //                     otherSelects: [
    //                         "Фиолетовый",
    //                         "Зелёный",
    //                         "Оранжевый"
    //                     ]
    //                 }
    //             },
    //             {
    //                 id: 6,
    //                 type: "practice",
    //                 task: {
    //                     type: "MatchWordAndGif",
    //                     conditions: [
    //                         {
    //                             firstRepresentation: "Фиолетовый",
    //                             secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/14691.mp4",
    //                             wordId: "fbcae8dd-9c1c-42f2-a6e5-f5007047b17e"
    //                         },
    //                         {
    //                             firstRepresentation: "Красный",
    //                             secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/4495.mp4",
    //                             wordId: "c220eaaf-b029-4f11-9cd8-d3ffc62e2ee9"
    //                         },
    //                         {
    //                             firstRepresentation: "Оранжевый",
    //                             secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/349233.mp4",
    //                             wordId: "9f1cbb39-60b2-4bae-bfa7-4c31b29b95cf"
    //                         },
    //                         {
    //                             firstRepresentation: "Коричневый",
    //                             secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/7655.mp4",
    //                             wordId: "d5bfca14-9367-414c-98b6-d7751c9739b4",
    //                         },
    //                     ]
    //                 }
    //             },
    //             {
    //                 id: 7,
    //                 type: "practice",
    //                 task: {
    //                     type: "MatchWordAndGif",
    //                     conditions: [
    //                         {
    //                             firstRepresentation: "Коричневый",
    //                             secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/7655.mp4",
    //                             wordId: "d5bfca14-9367-414c-98b6-d7751c9739b4"
    //                         },
    //                         {
    //                             wordId: "fbcae8dd-9c1c-42f2-a6e5-f5007047b17e",
    //                             firstRepresentation: "Фиолетовый",
    //                             secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/14691.mp4",
    //                         },
    //                         {
    //                             wordId: "9f1cbb39-60b2-4bae-bfa7-4c31b29b95cf",
    //                             firstRepresentation: "Оранжевый",
    //                             secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/349233.mp4",
    //                         },
    //                         {
    //                             wordId: "62f341ec-e4a3-4500-adb9-f9a52ce81a21",
    //                             firstRepresentation: "Зелёный",
    //                             secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/5717.mp4",
    //                         },
    //                     ]
    //                 }
    //             },
    //             {
    //                 id: 8,
    //                 type: "practice",
    //                 task: {
    //                     type: "SelectGifByWord",
    //                     rightSelect: {
    //                         wordId: "fbcae8dd-9c1c-42f2-a6e5-f5007047b17e",
    //                         firstRepresentation: "Фиолетовый",
    //                         secondRepresentation: "https://media.spreadthesign.com/video/mp4/12/14691.mp4"
    //                     },
    //                     otherSelects: [
    //                         "https://media.spreadthesign.com/video/mp4/12/349233.mp4",
    //                         "https://media.spreadthesign.com/video/mp4/12/5717.mp4",
    //                         "https://media.spreadthesign.com/video/mp4/12/7655.mp4"
    //                     ]
    //                 }
    //             },
    //         ],
    //         theoryCount: 5
    //     }
    // }
    const [currentStep, setCurrentStep] = useState(0)
    const [exitModalIsOpen, setExitModalIsOpen] = useState(false)
    const [rightWords, setRightWords] = useState<string[]>([])
    const tasks = levelController.level.tasks
    const theoryCount = levelController.level.theoryCount;
    const practiceCount = levelController.level.practiceCount;

    const sendResult = useMutation(
        ['userhistory/sendlevelresult', id],
        () => UserHistoryService.sendLevelResult(
            {
                levelId: id || "", completedWords: rightWords
            }
        )
    )

    const nextStep = useCallback(() => {
        if (currentStep + 1 === theoryCount + practiceCount) {
            sendResult.mutate()
            fireworks()
        }
        setCurrentStep(currentStep + 1)
    }, [currentStep, setCurrentStep])

    const prevStep = useCallback(() => {
        setCurrentStep(currentStep - 1)
    }, [currentStep, setCurrentStep])

    const openExitModal = useCallback(() => setExitModalIsOpen(true), [setExitModalIsOpen])
    const toProfilePage = useCallback(() => navigate("/profile"), [navigate])

    if (levelController.isLoading)
        return <Spinner/>

    return (
        <Suspense fallback={<Spinner/>}>
            <Page>
                <ExitConfirmation isOpen={exitModalIsOpen} setIsOpen={setExitModalIsOpen}/>
                <PageContent className={styles.learningTask}>
                    <div className={styles.learningTask__logoContainer} onClick={openExitModal}>
                        <img src={Logo} rel="preload" alt="Логотип" width={218}/>
                    </div>

                    <div className={styles.learningTask__contentContainer}>
                        {
                            currentStep !== -1 && currentStep < theoryCount + practiceCount &&
                            <LearningHeader
                                type={tasks[currentStep].type}
                                name={"Входное тестирование для абитуриентов"}
                                currentStep={currentStep}
                                stepCount={tasks.length}
                            />
                        }
                        <div className={styles.learningTask__taskContainer}>
                            {
                                currentStep === -1 &&
                                <StartLearning onStart={nextStep}/>
                            }
                            {
                                currentStep >= 0 && currentStep < theoryCount + practiceCount &&
                                (
                                    <div
                                        className={clsx(styles.learningTask__theory, styles.learningTask__startAnimation, tasks[currentStep]?.task?.type === "MatchWordAndGif" && styles.learningTask__short)}>
                                        <LearningTaskBlock
                                            task={tasks[currentStep]}
                                            currentStep={currentStep}
                                            nextStep={nextStep}
                                            prevStep={prevStep}
                                            rightWords={rightWords}
                                            setRightWords={setRightWords}
                                        />
                                        <div className={styles.learningTask__back}>
                                            <Back to="/learning"/>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                currentStep === theoryCount + practiceCount &&
                                <div className={styles.learningTask__result}>
                                    <img src={ResultLearning} alt={"Конец обучения!"}
                                         className={styles.learningTask__resultImage}/>
                                    <Typography variant="p" className={styles.learningTask__resultDescription}>
                                        Вы выучили {theoryCount} жестов.<br/>
                                        Теперь можно перейти к следующему этапу<br/>
                                        и попробовать их на практике.
                                    </Typography>
                                    <Button variant={"solid"} color={"primary"} onClick={toProfilePage}>
                                        В меню
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>
                </PageContent>
            </Page>
        </Suspense>
    )
})
