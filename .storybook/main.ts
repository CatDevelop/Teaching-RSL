import type { StorybookConfig } from "@storybook/react-webpack5";
const path = require('path');

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "storybook-css-modules"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  swc: () => ({
    jsc: {
        transform: {
            react: {
                runtime: 'automatic'
            }
        }
      }
  }),
  webpackFinal: async (config) => {
    if(!config || !config.resolve){
      return config
    }

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@nextui-org/react": "@nextui-org/react",
        },
        modules: [
          ...(config.resolve.modules || []),
          path.resolve(__dirname, "../src"),
        ]
      },
    }
  },
  docs: {
    autodocs: "tag",
    defaultName: 'Documentation',
  },
  staticDirs: ["..\\public"],
};
export default config;
