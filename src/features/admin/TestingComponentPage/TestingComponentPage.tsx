import React, {FC, useState} from "react";
import {typedMemo} from "../../../core/utils/typedMemo";
import styles from "./TestingComponentPage.module.css";
import {Button} from "../../../components/Button";
import {Card} from "../../../components/Card";
import {ScrollBox} from "../../../components/ScrollBox";
import {TaskContinue} from "../../../components/TaskContinue";
import {TaskProgress} from "../../../components/TaskProgress";
import {SystemTestPreview} from "../../training/pages/TrainingCatalogPage/components/SystemTestPreview";
import {UserTestPreview} from "../../training/pages/TrainingCatalogPage/components/UserTestPreview";
import SettingsSVG from '../../../assets/images/Settings.svg'
import {SystemTests} from "../../training/pages/TrainingCatalogPage/components/SystemTests";
import clsx from "clsx";
import {WorkOnMistakes} from "../../training/pages/TrainingCatalogPage/components/WorkOnMistakes";
import {TheoryCard} from "../../learning/components/TheoryCard";
import {LearningBlock} from "../../learning/components/LearningBlock";
import TheoryIconSVG from "../../../assets/images/TheoryIcon.svg"
import {SelectButton} from "../../learning/components/SelectEntity/SelectButton";
import {Word} from "../../../core/models/Word";
import {SelectGIF} from "../../learning/components/SelectEntity/SelectGIF";
import {SelectImage} from "../../learning/components/SelectEntity/SelectImage";
import {words} from "./data";

export const TestingComponentPage: FC = typedMemo(function TestingComponentPage() {
    const [selectWord, setSelectWord] = useState<Word | null>(null)
    const [selectGIF, setSelectGIF] = useState<Word | null>(null)
    const [selectImage, setSelectImage] = useState<Word | null>(null)

    const [progressBar, setProgressBar] = useState(1);


    return (
        <div className={styles.container}>
            <h1 className={clsx(styles.componentTitle, styles.large)}>Общие компоненты</h1>

            <h2 className={styles.componentTitle}>Кнопка</h2>
            <div className={styles.componentRow}>
                <Button color={"primary"}>Primary</Button>
                <Button variant={"faded"} color={"primary"}>Secondary</Button>
                <Button variant={"faded"}>Technical</Button>
                <Button variant={"light"} color={"primary"}>Primary text button</Button>
                <Button variant={"light"}>Secondary text button</Button>
            </div>

            <h2 className={styles.componentTitle}>Кнопка c иконкой</h2>
            <div className={styles.componentRow}>
                <Button variant={"faded"}
                        color={"primary"}
                        size={"lg"}
                        startContent={
                            <svg width="24" height="15" viewBox="0 0 24 15" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.0718 14.9756C4.87192 14.9756 0.19489 9.35414 0 0H4.10744C4.24236 6.86569 7.2704 9.77386 9.66887 10.3735V0H13.5366V5.92124C15.9051 5.66642 18.3932 2.96814 19.2327 0H23.1004C22.4558 3.65772 19.7575 6.356 17.8387 7.46529C19.7575 8.36473 22.8307 10.7183 24 14.9756H19.7425C18.8281 12.1274 16.5497 9.92377 13.5366 9.62394V14.9756H13.0718Z"
                                    fill="#0077FF"/>
                            </svg>
                        }
                >
                    Вконтакте
                </Button>
                <Button variant={"faded"}
                        startContent={<img style={{width: "16px", height: "16px"}} src={SettingsSVG} alt={"Иконка"}/>}
                >
                    Technical
                </Button>
                <Button variant={"faded"} isIconOnly>
                    <img style={{width: "16px", height: "16px"}} src={SettingsSVG} alt={"Иконка"}/>
                </Button>
            </div>

            <h2 className={styles.componentTitle}>Карточка</h2>
            <div className={styles.componentRow}>
                <Card>
                    Содержание карточки
                </Card>
            </div>

            <h2 className={styles.componentTitle}>Карточка</h2>
            <div className={styles.componentRow}>
                <div style={{height: "300px", width: "500px"}}>
                    <ScrollBox>
                        sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>d
                    </ScrollBox>
                </div>
            </div>

            <h2 className={styles.componentTitle}>Плашка состояния уровня</h2>
            <TaskContinue continue={() => console.log(123213)} isRightAnswer={true} rightAnswer={"awdawd"}/>
            <TaskContinue continue={() => console.log(123213)} isRightAnswer={false} rightAnswer={"awdawd"}/>

            <h2 className={styles.componentTitle}>Прогресс уровня</h2>
            <TaskProgress currentTaskId={progressBar} tasks={[{id: 1}, {id: 2}, {id: 3}, {id: 4}]}/>
            <div className={styles.componentRow}>
                <Button startContent={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15 12H9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                } isIconOnly={true} variant={"faded"}
                        onClick={() => {
                            if (progressBar > 0) setProgressBar(progressBar - 1)
                        }}
                />
                <Button startContent={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 9V12M12 12V15M12 12H15M12 12H9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                } isIconOnly={true} variant={"faded"}
                        onClick={() => {
                            if (progressBar < 4) setProgressBar(progressBar + 1)
                        }}
                />
            </div>

            <h1 className={clsx(styles.componentTitle, styles.large)}>Раздел тренировки</h1>

            <h2 className={styles.componentTitle}>Карточка пользовательского теста</h2>
            <UserTestPreview name={"ДЗ №12 от 31.08.2023"} allWordsCount={12}/>

            <h2 className={styles.componentTitle}>Карточка системного теста</h2>
            <SystemTestPreview id={1} name={"Название"} allWordsCount={10} passedWordsCount={1} color={"#AE7EDE"}/>

            <h2 className={styles.componentTitle}>Окно с системными тестами</h2>
            <SystemTests themes={[
                {
                    name: "Тестовая тема",
                    id: 0,
                    color: "#AE7EDE",
                    tests: [
                        {
                            name: "Приветствие",
                            allWordsCount: 46,
                            passedWordsCount: 12,
                            id: 10
                        },
                        {
                            name: "Теология",
                            allWordsCount: 34,
                            passedWordsCount: 10,
                            id: 11
                        }
                    ]
                },
                {
                    name: "Искусство и развлечения",
                    id: 1,
                    color: "#66AAF9",
                    tests: [
                        {
                            name: "Музыка",
                            allWordsCount: 27,
                            passedWordsCount: 12,
                            id: 10
                        },
                        {
                            name: "Изобразительные искусства",
                            allWordsCount: 39,
                            passedWordsCount: 29,
                            id: 11
                        }
                    ]
                }
            ]}/>

            <h2 className={styles.componentTitle}>Окно с работой над ошибками</h2>
            <WorkOnMistakes missingWordsCount={5}/>

            <h1 className={clsx(styles.componentTitle, styles.large)}>Раздел обучение</h1>

            <h2 className={styles.componentTitle}>Основа окон для обучения</h2>
            <LearningBlock iconUrl={TheoryIconSVG} title={"Заголовок окна"}/>

            <h2 className={styles.componentTitle}>Окно с теорией</h2>
            <TheoryCard wordObject={words[0]}/>
            <TheoryCard wordObject={words[1]}/>

            <h2 className={styles.componentTitle}>Кнопка выбора</h2>
            <div className={styles.componentRow}>
                <SelectButton state={selectWord?.id === words[0].id ? "checked" : "default"}
                              setState={setSelectWord}
                              wordObject={words[0]}

                />
                <SelectButton state={"success"}
                              setState={setSelectWord}
                              wordObject={words[1]}
                />
                <SelectButton state={"disabled"}
                              setState={setSelectWord}
                              wordObject={words[2]}

                />
                <SelectButton state={"error"}
                              setState={setSelectWord}
                              wordObject={words[3]}
                />
            </div>

            <h2 className={styles.componentTitle}>GIF с выбором</h2>
            <div className={styles.componentRow}>
                <SelectGIF state={selectGIF?.id === words[0].id ? "checked" : "default"}
                           wordObject={words[0]}
                           setState={setSelectGIF}
                           number={1}
                           key={"selectGIF1"}
                />
                <SelectGIF state={"success"}
                           wordObject={words[1]}
                           setState={setSelectGIF}
                           number={2}
                           key={"selectGIF2"}
                />
                <SelectGIF state={"disabled"}
                           wordObject={words[2]}
                           setState={setSelectGIF}
                           number={3}
                           key={"selectGIF3"}
                />
                <SelectGIF state={"error"}
                           wordObject={words[3]}
                           setState={setSelectGIF}
                           number={4}
                           key={"selectGIF4"}
                />
            </div>

            <h2 className={styles.componentTitle}>Изображение с выбором</h2>
            <div className={styles.componentRow}>
                <SelectImage state={selectImage?.id === words[0].id ? "checked" : "default"}
                             wordObject={words[0]}
                             setState={setSelectImage}
                             number={1}
                             key={"selectImage1"}
                />
                <SelectImage state={"success"}
                             wordObject={words[1]}
                             setState={setSelectImage}
                             number={2}
                             key={"selectImage2"}
                />
                <SelectImage state={"disabled"}
                             wordObject={words[2]}
                             setState={setSelectImage}
                             number={3}
                             key={"selectImage3"}
                />
                <SelectImage state={"error"}
                             wordObject={words[3]}
                             setState={setSelectImage}
                             number={3}
                             key={"selectImage4"}
                />
            </div>

            {/*<h2 className={styles.componentTitle}>Карточки практики</h2>*/}
            {/*<div className={styles.componentRow}>*/}
            {/*    <PracticeSelectWord wordObject={words[0]} variants={words}/>*/}
            {/*    <PracticeSelectWord wordObject={words[0]} variants={words} isRightAnswer={true}/>*/}
            {/*</div>*/}
            {/*<PracticeSelectGIF wordObject={words[0]} variants={words}/>*/}
            {/*<PracticeSelectPairForWord variants={words}/>*/}

        </div>
    )
});
