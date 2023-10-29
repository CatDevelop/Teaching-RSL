import React, {FC, Suspense} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import styles from "./DictionaryByThemePage.module.css";
import {Typography} from "../../../../components/Typography";
import {Page} from "../../../../components/Page";
import {PageContent} from "../../../../components/PageContent";
import {SideBar} from "../../../../components/SideBar";
import {Card} from "../../../../components/Card";
import {Spinner} from "@nextui-org/react";

export const DictionaryByThemePage: FC = typedMemo(function DictionaryByThemePage() {
    return (
        <Page className={styles.dictionary}>
            <SideBar/>
            <PageContent className={styles.dictionary__pageContent}>
                <Suspense fallback={<Spinner className={styles.dictionary__loading}/>}>
                    <Card className={styles.dictionary__titleContainer}>
                        <Typography
                            variant="h1"
                            className={styles.dictionary__titleContainer__title}
                        >
                            Словарь
                        </Typography>
                        <Typography
                            variant="p"
                            className={styles.dictionary__titleContainer__description}
                        >
                            Здесь можно найти абсолютно все жесты
                        </Typography>
                    </Card>
                </Suspense>
            </PageContent>
        </Page>
    )
})
