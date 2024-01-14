import {SingleLevelTask} from "./SingleLevelTask";
import {MultiLevelTask} from "./MultiLevelTask";

/**
 * Полученный тест.
 */
export class GetLevelTasksResponse {
    /**
     * Задания с одним ответом.
     */
    public readonly singleTasks: SingleLevelTask[];

    /**
     * Задания с множеством ответов.
     */
    public readonly multiTasks: MultiLevelTask[];

    public constructor({singleTasks, multiTasks}: GetLevelTasksResponseProps) {
        this.singleTasks = singleTasks;
        this.multiTasks = multiTasks;
    }
}

type GetLevelTasksResponseProps = GetLevelTasksResponse;
