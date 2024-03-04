import {Meta, StoryObj} from '@storybook/react';
import {TrainingPage, Props} from './TrainingPage';
import { createDecorators } from 'core/mock/storybook/createDecorator';
import { TestTypeEnum } from 'core/models/themes/TestTypeEnum';
import { ApiUrlsConfig } from 'api/apiUrlsConfig';

const meta: Meta<Props> = {
    title: 'features/training/TrainingPage',
    component: TrainingPage,
    decorators: createDecorators({
        route: '/training/:id',
        routerEntries: ['/training/1'],
        axiosMocks: [
            {
                method: "GET",
                path: ApiUrlsConfig.training.getTest('1'),
                reply: {
                    statusOrCallback: 200,
                    data: {
                        if: 1,
                        testName: 'Name',
                        words: [
                            {id: 1, word: 'Word'}
                        ],
                        testType: TestTypeEnum.CustomTest
                    }
                }
            }
        ]
    })
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {}
};