declare module '*.module.css' {
    const content: { [className: string]: string };
    export default content;
}

declare module "*.svg" {
    import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<React.SVGProps<
      SVGSVGElement
    > & { title?: string }>;

    const src: string;
    export default src;
}

declare module "*.png" {
    const content: any;
    export default content;
}

declare module "*.webp" {
    const content: any;
    export default content;
}


declare module "*.mp4" {
    const content: any;
    export default content;
}
