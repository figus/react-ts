import * as React from "react";

export interface IHelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: IHelloProps) => {
  return (
  <h1>
    Hello from {props.compiler} and {props.framework}
  </h1>
  );
};
