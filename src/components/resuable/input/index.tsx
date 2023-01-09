import React, { ReactElement } from "react";

interface LabelProps extends React.ComponentProps<"label"> {
  className?: string;
}
interface ContainerProps extends React.ComponentProps<"div"> {}
interface InputProps extends React.ComponentProps<"input"> {
  labelProps?: LabelProps;
  containerProps?: ContainerProps;
  label?: string;
}
export default function Input({
  className,
  labelProps: { className: labelClassName, ...remainingLabelProps } = {},
  label,
  containerProps,
  ...props
}: InputProps): ReactElement {
  return (
    <div {...containerProps}>
      {label && (
        <label
          htmlFor="nepInput"
          className={[
            "form-label inline-block mb-2 text-gray-700",
            labelClassName,
          ].join(" ")}
          {...remainingLabelProps}
        >
          {label}
        </label>
      )}
      <input
        className={[
          `  form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none`,
          className,
        ].join(" ")}
        {...props}
      />
    </div>
  );
}
