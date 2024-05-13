import React, {FC, useMemo} from "react";
import {typedMemo} from "../../../../../core/utils/typedMemo";
import {Card, CardHeader} from "../../../../../components/Card";
import {ThemeProgress} from "./ThemeProgress";
import styles from "./LearningProgress.module.css";
import {Tab, Tabs} from "@nextui-org/react";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import {clsx} from "clsx";
import {ScrollBox} from "../../../../../components/ScrollBox";
import {TestProgress} from "./TestProgress";
import {useQuery} from "react-query";
import {UserService} from "api/services/user";
import {Typography} from "../../../../../components/Typography";
import {GetTrainingHistoryResponse} from "../../../../../core/models/userHistory/GetTrainingHistoryResponse";
import {UserHistoryService} from "../../../../../api/services/userHistory";
import {TrainingProgress} from "./TrainingProgress";

type Props = ComponentProps & Readonly<{}>

/**
 * Прогресс обучения пользователя
 */
export const LearningProgress: FC<Props> = typedMemo(function LearningProgress(props) {
    const {data: testHistory} = useQuery('user-test-history', UserService.getTestHistory)
    const {data: themesHistory} = useQuery('user-themes-history', UserService.getThemesHistory)
    const {data: trainingHistory} = useQuery<GetTrainingHistoryResponse>("traininghistory/get", UserHistoryService.getTrainingHistory)

    const userLearningHistory = useMemo(() => (
        themesHistory!.sort((a, b) => a.themeName!.localeCompare(b.themeName || ""))
    ), [themesHistory])

    const userTrainingHistory = useMemo(() => (
        trainingHistory!.themeInfoDalList.sort((a, b) => a.themeName.localeCompare(b.themeName))
    ), [trainingHistory])


    const userTestsHistory = useMemo(
        () => (
            testHistory!.slice(0).reverse().filter(test => test.isUserTest)
                .sort((a, b) => a.name!.localeCompare(b.name || ""))
        ), [testHistory])

    return (
        <Card className={clsx([styles.learningProgress, props.className])}>
            <CardHeader>Progress</CardHeader>
            <Tabs className={styles.learningProgress__tabs} classNames={{
                panel: styles.learningProgress__tabsPanel
            }}>
                <Tab key="learning" title="Learning">
                    <ScrollBox>
                        {
                            userLearningHistory.length > 0 &&
                            <div className={styles.learningProgress__themes}>
                                {themesHistory!.map(theme => (
                                    <ThemeProgress key={theme.themeId} {...theme}/>
                                ))}
                            </div>
                        }
                        {
                            userLearningHistory!.length <= 0 &&
                            <Typography variant="h1" className={styles.learningProgress__empty}>
                                You haven't completed any learning yet
                            </Typography>
                        }
                    </ScrollBox>
                </Tab>
                <Tab key="training" title="Training">
                    <ScrollBox>
                        <div className={styles.learningProgress__themes}>
                            {
                                userTrainingHistory.length > 0 &&
                                userTrainingHistory.map((item, i) => (
                                        <TrainingProgress {...item} key={i}/>
                                    ))
                            }
                            {
                                userTrainingHistory.length <= 0 &&
                                <Typography variant="h1" className={styles.learningProgress__empty}>
                                    You haven't completed any training yet
                                </Typography>
                            }
                        </div>
                    </ScrollBox>
                </Tab>
                <Tab key="customtests" title="Tests">
                    <ScrollBox>
                        {
                            userTestsHistory.length > 0 &&
                            <div className={styles.learningProgress__customTests}>
                                {
                                    userTestsHistory.map((item, i) => (
                                        <TestProgress {...item} key={i}/>
                                    ))
                                }
                            </div>
                        }

                        {
                            userTestsHistory!.length <= 0 &&
                            <Typography variant="h1" className={styles.learningProgress__empty}>
                                You haven't taken any tests yet
                            </Typography>
                        }
                    </ScrollBox>
                </Tab>
            </Tabs>
        </Card>
    )
})
