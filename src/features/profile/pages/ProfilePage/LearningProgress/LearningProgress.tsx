import React, {FC} from "react";
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
import {UserThemeHistoryRecordResponse} from "../../../../../core/models/userHistory/UserThemeHistoryRecordResponse";

type Props = ComponentProps & Readonly<{}>

/**
 * Прогресс обучения пользователя
 */
export const LearningProgress: FC<Props> = typedMemo(function LearningProgress(props) {
    const {data: testHistory} = useQuery('user-test-history', UserService.getTestHistory)
    // const {data: themesHistory} = useQuery('user-themes-history', UserService.getThemesHistory)

    // TODO временно
    const themesHistory: UserThemeHistoryRecordResponse[] = [
        {themeId: "1", themeName: "Начальные слова", wordsCount: 50, wordsCompletedCount: 10},
        {themeId: "2", themeName: "Части речи", wordsCount: 30, wordsCompletedCount: 1}
    ]

    return (
        <Card className={clsx([styles.learningProgress, props.className])}>
            <CardHeader>Прогресс прохождения</CardHeader>
            <Tabs className={styles.learningProgress__tabs} classNames={{
                panel: styles.learningProgress__tabsPanel
            }}>
                <Tab key="learning" title="Обучение">
                    <ScrollBox>
                        <div className={styles.learningProgress__themes}>
                            {themesHistory!.map(theme => (
                                <ThemeProgress key={theme.themeId} {...theme}/>
                            ))}
                        </div>
                    </ScrollBox>
                </Tab>
                <Tab key="training" title="Практики">
                    <ScrollBox>
                        <div className={styles.learningProgress__themes}>
                            {testHistory!.map((item, i) => (
                                <TestProgress {...item} key={i}/>
                            ))}
                        </div>
                    </ScrollBox>
                </Tab>
            </Tabs>
        </Card>
    )
})
