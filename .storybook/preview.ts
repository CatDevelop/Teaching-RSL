import type { Preview } from "@storybook/react";
import {createDecorators} from '../src/core/mock/storybook/createDecorator'
import {QueryDecorator} from '../src/core/mock/storybook/QueryDecorator'
import {ToastDecorator} from '../src/core/mock/storybook/ToastDecorator'
import {SuspenseDecorator} from '../src/core/mock/storybook/SuspenseDecorator'
import '../src/index.css';
import { NextUIDecorator } from "../src/core/mock/storybook/NextUIDecorator";


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    NextUIDecorator,
    QueryDecorator,
    ToastDecorator,
    SuspenseDecorator,
  ],
};

export default preview;
