import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import styles from "./ProfilePage.module.css";
import {Page} from "../../../../components/Page";
import {PageContent} from "../../../../components/PageContent";
import {SideBar} from "../../../../components/SideBar";
import {LevelProgress} from "./LevelProgress";
import {LearningProgress} from "./LearningProgress";
import {Statistics} from "./Statistics";
import {Trophies} from "./Trophies";

/**
 * Профиль
 */
export const ProfilePage: FC = typedMemo(function LearningCatalogPage() {
    return (
        <Page>
            <SideBar/>
            <PageContent className={styles.profile__pageContent}>
                <LevelProgress/>
                <LearningProgress className={styles.profile__learningProgress}/>
                <Statistics/>
                <Trophies/>
            </PageContent>
        </Page>
    )
})
