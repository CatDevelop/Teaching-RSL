import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import styles from "./ProfilePage.module.css";
import {Page} from "../../../../components/Page";
import {PageContent} from "../../../../components/PageContent";
import {SideBar} from "../../../../components/SideBar";
import {LevelBlock} from "../../../../components/LevelBlock";
import {Card} from "../../../../components/Card";
import {Spinner} from "@nextui-org/react";

export const ProfilePage: FC = typedMemo(function LearningCatalogPage() {
    return (
        <Page>
            <SideBar/>
            <PageContent className={styles.profile__pageContent}>
                {/*<Suspense fallback={<Spinner className={styles.profile__loading}/>}>*/}
                <Spinner className={styles.profile__loading}/>
                <Card className={styles.profile__levelBlock}>
                    <LevelBlock level={33} experience={1236} experienceForNextLevel={3000}/>
                </Card>
                {/*</Suspense>*/}
            </PageContent>
        </Page>
    )
})
