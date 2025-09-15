declare namespace React {
  type Key = string | number;
  interface Attributes {
    key?: Key;
  }
  interface ClassAttributes<T> extends Attributes {
    ref?: any;
  }
  interface FunctionComponent<P = {}> {
    (props: P & { children?: ReactNode }): ReactElement | null;
  }
  type FC<P = {}> = FunctionComponent<P>;
  type ReactNode = ReactElement | string | number | boolean | null | undefined | ReactNode[];
  interface ReactElement {
    type: any;
    props: any;
    key: Key | null;
  }
  interface JSXElementConstructor<P> {
    (props: P): ReactElement | null;
  }
}

declare const React: {
  [key: string]: any;
  createElement: (...args: any[]) => any;
  Fragment: any;
  useEffect: (effect: () => void | (() => void), deps?: any[]) => void;
  useMemo: <T>(factory: () => T, deps: any[]) => T;
  useState: <T = any>(initial: T) => [T, (value: T | ((prev: T) => T)) => void];
};

declare module "react" {
  export = React;
  export as namespace React;
  export const createElement: typeof React.createElement;
  export const Fragment: typeof React.Fragment;
  export const useEffect: typeof React.useEffect;
  export const useMemo: typeof React.useMemo;
  export const useState: typeof React.useState;
}

declare namespace JSX {
  interface Element extends React.ReactElement {}
  interface ElementClass {
    render: any;
  }
  interface ElementAttributesProperty {
    props: any;
  }
  interface ElementChildrenAttribute {
    children: any;
  }
  interface IntrinsicAttributes {
    key?: React.Key;
  }
  type IntrinsicElements = {
    [elemName: string]: any;
  };
}

declare module "react/jsx-runtime" {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare module "react/jsx-dev-runtime" {
  export const jsxDEV: any;
  export const Fragment: any;
}
