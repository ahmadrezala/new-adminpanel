/* eslint-disable react/display-name */
import classNames from "classnames";
import { Size } from "../types/size.type";
import { TextareaProps } from "./textarea.type";
import { forwardRef } from "react";

const sizeClasses: Record<Size, string> = {
  tiny: "textarea-xs",
  small: "textarea-sm",
  normal: "textarea-md",
  large: "textarea-lg",
};

export const Textarea: React.FC<TextareaProps> = forwardRef<
HTMLTextAreaElement,
  TextareaProps
>(
  (
    {
      variant = "ghost",
      label,
      className,
      size = "normal",
      ...rest
    },
    ref
  ) => {
    const classes = classNames(
      "textarea",
      "w-full",
      className,
      { [`textarea-${variant}`]: variant },
      { [`${sizeClasses[size]}`]: size }
    );
    return (
      <div className="w-full">
        <label htmlFor="">{label}</label>
        <textarea ref={ref} className={classes} {...rest} />
      </div>
    );
  }
);


