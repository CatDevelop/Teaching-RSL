import {Meta, StoryObj} from '@storybook/react';
import {createDecorators} from 'core/mock/storybook/createDecorator';
import React from "react";
import {MaterialModal, Props} from "./MaterialModal";
import MaterialModalImage from './MaterialModal.webp';

const meta: Meta<Props> = {
    title: 'shared/MaterialModal',
    component: MaterialModal,
    decorators: createDecorators({}),

};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {
        material: <img src={MaterialModalImage}/>
    },
    render: props => (
        <div style={{width: '100px', height: '200px'}}>
            <MaterialModal {...props}/>
        </div>
    )
};
