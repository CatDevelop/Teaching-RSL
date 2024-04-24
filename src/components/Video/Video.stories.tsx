import {Meta, StoryObj} from '@storybook/react';
import {createDecorators} from 'core/mock/storybook/createDecorator';
import {Video, Props} from "./Video";
import VideoSrc from './Video.mp4';

const meta: Meta<Props> = {
    title: 'shared/Video',
    component: Video,
    decorators: createDecorators({}),

};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {
        src: VideoSrc,
        controls: true,
        autoPlay: true,
    },
};
