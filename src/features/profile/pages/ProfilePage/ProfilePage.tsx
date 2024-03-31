import React, {FC, Suspense} from "react";
import {typedMemo} from "core/utils/typedMemo";
import styles from "./ProfilePage.module.css";
import {Page} from "components/Page";
import {PageContent} from "components/PageContent";
import {SideBar} from "components/SideBar";
import {LearningProgress} from "./LearningProgress";
import {Statistics} from "./Statistics";
import {Trophies} from "./Trophies";
import { Card } from "components/Card";
import { LevelBlock } from "components/LevelBlock";
import { useQuery } from "react-query";
import { UserService } from "api/services/user";
import {Spinner} from "@nextui-org/react";

/**
 * Профиль
 */
export const ProfilePage: FC = typedMemo(function LearningCatalogPage() {
    const {data: user} = useQuery('user-welcome-info', UserService.getWelcomeUserInfo)

    return (
        <Page>
            <SideBar/>
            <PageContent className={styles.profile__pageContent}>
                <Suspense fallback={<Spinner/>}>
                    <Card className={styles.profile__levelBlock}>
                        <LevelBlock level={user!.level} experience={user!.userExperience} experienceForNextLevel={user!.maxLevelExperience}/>
                    </Card>

                    <LearningProgress className={styles.profile__learningProgress}/>
                    <Statistics user={user!}/>
                    <Trophies/>
                </Suspense>
            </PageContent>
        </Page>
    )
})
