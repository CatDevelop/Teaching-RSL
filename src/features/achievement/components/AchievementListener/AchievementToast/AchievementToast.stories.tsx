import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import {AchievementToast, Props} from './AchievementToast';
import { createDecorators } from 'core/mock/storybook/createDecorator';
import {ReactComponent as BronzeAchievementIcon} from 'assets/images/BronzeAchievementIcon.svg'

const meta: Meta<Props> = {
    title: 'features/achievement/AchievementToast',
    component: AchievementToast,
    decorators: createDecorators({})
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {
        image: <BronzeAchievementIcon/>,
        name: 'Test'
    }
};
