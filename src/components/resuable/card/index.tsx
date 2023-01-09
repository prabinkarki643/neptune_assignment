import React, { ReactElement } from "react";

interface CardProps extends React.ComponentProps<"div"> {}

export default function Card({
  className,
  children,
  ...props
}: CardProps): ReactElement {
  return <div className={["card", className].join(" ")} {...props}>{children}</div>;
}
