/* eslint-disable react/display-name */
import classNames from "classnames";
import { Size } from "../types/size.type";
import { TextboxProps } from "./textbox.type";
import { forwardRef } from "react";

const sizeClasses: Record<Size, string> = {
  tiny: "textbox-xs",
  small: "textbox-sm",
  normal: "textbox-md",
  large: "textbox-lg",
};

export const Textbox: React.FC<TextboxProps> = forwardRef<
  HTMLInputElement,
  TextboxProps
>(
  (
    {
      variant = "ghost",
      type = "text",
      label,
      className,
      size = "normal",
      ...rest
    },
    ref
  ) => {
    const classes = classNames(
      "textbox",
      "w-full",
      className,
      { [`textbox-${variant}`]: variant },
      { [`${sizeClasses[size]}`]: size }
    );
    return (
      <>
        <label className="mb-2" htmlFor="">{label}</label>
        <input ref={ref} type={type} className={classes} {...rest} />
      </>
    );
  }
);

export default Textbox;
