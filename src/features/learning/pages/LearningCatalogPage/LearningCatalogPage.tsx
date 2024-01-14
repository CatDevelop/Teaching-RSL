import React, {FC, Suspense} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import styles from "./LearningCatalogPage.module.css";
import {Page} from "../../../../components/Page";
import {PageContent} from "../../../../components/PageContent";
import {SideBar} from "../../../../components/SideBar";
import {ThemesList} from "../../components/ThemesList/ThemesList";
import {LevelBlock} from "../../../../components/LevelBlock";
import {Card} from "../../../../components/Card";
import {Spinner} from "@nextui-org/react";


/**
 * Каталог уровней обучения
 */
export const LearningCatalogPage: FC = typedMemo(function LearningCatalogPage() {
    return (
        <Page>
            <SideBar/>
            <PageContent className={styles.learningCatalog__pageContent}>
                <Suspense fallback={<Spinner className={styles.learningCatalog__loading}/>}>
                    <Card className={styles.learningCatalog__levelBlock}>
                        <LevelBlock level={33} experience={1236} experienceForNextLevel={3000}/>
                    </Card>
                    <div className={styles.learningCatalog__themes}>
                        <ThemesList />
                    </div>
                    <div></div>
                </Suspense>
            </PageContent>
        </Page>
    )
})
