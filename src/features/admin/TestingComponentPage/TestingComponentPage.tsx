import React, {FC} from "react";
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

export const TestingComponentPage: FC = typedMemo(function TestingComponentPage() {
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
            <TaskProgress currentTaskId={3} tasks={[{id: 1}, {id: 2}, {id: 3}, {id: 4}]}/>


            <h1 className={clsx(styles.componentTitle, styles.large)}>Раздел тренировки</h1>

            <h2 className={styles.componentTitle}>Карточка пользовательского теста</h2>
            <UserTestPreview name={"ДЗ №12 от 31.08.2023"} allWordsCount={12}/>

            <h2 className={styles.componentTitle}>Карточка системного теста</h2>
            <SystemTestPreview id={1} name={"Название"} allWordsCount={10} passedWordsCount={1} color={"#AE7EDE"}/>

            <h2 className={styles.componentTitle}>Окно с системными тестами</h2>
            <SystemTests themes={[
                {
                    name: "Тестовая тема",
                    id: 1,
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
        </div>
    )
});
