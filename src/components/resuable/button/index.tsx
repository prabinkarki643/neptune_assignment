import React, { ReactElement } from "react";

type ButtonVarient = "default" | "light" | "outline" | "custom" | "text";
interface ButtonProps extends React.ComponentProps<"button"> {
  varient?: ButtonVarient;
}
export default function Button({
  className = "",
  children,
  varient = "default",
  ...props
}: ButtonProps): ReactElement {
  var classNames = [
    "text-sm font-medium px-5 py-2.5 rounded-lg focus:z-10 flex-1",
  ];
  if (varient === "light") {
    classNames.push(
      "focus:ring-4 focus:outline-none text-gray-500 bg-white hover:bg-gray-100 focus:ring-gray-200 border border-gray-200"
    );
  } else if (varient === "outline") {
    classNames.push(
      "focus:ring-4 focus:outline-none text-gray-500 bg-white hover:bg-gray-100 focus:ring-gray-200 border border-gray-200 hover:text-gray-900"
    );
  } else if (varient === "default") {
    classNames.push(
      "focus:ring-4 focus:outline-none text-white bg-sky-700 hover:bg-sky-800 focus:ring-sky-300"
    );
  } else if (varient === "text") {
    classNames.push(
      "inline-block bg-transparent text-sky-600 font-medium text-sm leading-tight rounded hover:text-sky-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
    );
  }
  classNames.push(className);
  return (
    <button type="button" className={classNames.join(" ")} {...props}>
      {children}
    </button>
  );
}
