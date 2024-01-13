import React, {FC, Suspense} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import styles from "./TrainingCatalogPage.module.css";
import {Typography} from "../../../../components/Typography";
import {WorkOnMistakes} from "../../components/WorkOnMistakes";
import {Page} from "../../../../components/Page";
import {SystemTests} from "../../components/SystemTests";
import {UserTests} from "../../components/UserTests";
import {PageContent} from "../../../../components/PageContent";
import {SideBar} from "../../../../components/SideBar";
import {Card} from "../../../../components/Card";
import {Spinner} from "@nextui-org/react";
import {clsx} from "clsx";

export const TrainingCatalogPage: FC = typedMemo(function TrainingCatalogPage() {
    let missingWordsCount = 0; // temp

    return (
        <Page className={styles.trainingCatalog}>
            <SideBar/>
            <PageContent className={styles.trainingCatalog__pageContent}>

                <Card className={styles.trainingCatalog__titleContainer}>
                    <Typography
                        variant="h1"
                        className={styles.trainingCatalog__titleContainer__title}
                    >
                        Практика
                    </Typography>
                    <div className={styles.trainingCatalog__titleContainer__content}>
                        <Typography
                            variant="p"
                            className={styles.trainingCatalog__titleContainer__description}
                        >
                            Потренируйся в воспроизведении жестов, а мы поможем
                        </Typography>
                        {/*<Button color="primary" variant="light">Начать случайный тест</Button>*/}
                    </div>
                </Card>
                <Suspense fallback={<Spinner className={styles.trainingCatalog__loading}/>}>
                    <div className={styles.trainingCatalog__systemTests}>
                        <SystemTests/>
                    </div>

                    <div className={styles.trainingCatalog__otherTests}>
                        {
                            missingWordsCount !== 0 &&
                            <WorkOnMistakes
                                missingWordsCount={missingWordsCount}
                                className={styles.trainingCatalog__workOnMistakes}
                            />
                        }
                        <div className={clsx(
                            styles.trainingCatalog__userTests,
                            missingWordsCount !== 0 && styles.trainingCatalog__userTestsWithMistakes
                        )}>
                            <UserTests/>
                        </div>
                    </div>
                </Suspense>
            </PageContent>
        </Page>
    )
})
