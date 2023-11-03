import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import styles from "./ProfilePage.module.css";
import {Page} from "../../../../components/Page";
import {PageContent} from "../../../../components/PageContent";
import {SideBar} from "../../../../components/SideBar";
import {Spinner} from "@nextui-org/react";
import {LevelProgress} from "./LevelProgress";
import {LearningProgress} from "./LearningProgress";

export const ProfilePage: FC = typedMemo(function LearningCatalogPage() {
    return (
        <Page>
            <SideBar/>
            <PageContent className={styles.profile__pageContent}>
                {/*<Suspense fallback={<Spinner className={styles.profile__loading}/>}>*/}
                <Spinner className={styles.profile__loading}/>
                <LevelProgress/>
                <LearningProgress className={styles.profile__learningProgress}/>
                {/*</Suspense>*/}
            </PageContent>
        </Page>
    )
})
