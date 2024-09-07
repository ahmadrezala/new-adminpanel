/* eslint-disable react/display-name */
import classNames from "classnames";
import { Size } from "../types/size.type";
import { forwardRef } from "react";
import { DateboxProps } from "./datebox.type";

const sizeClasses: Record<Size, string> = {
  tiny: "datebox-xs",
  small: "datebox-sm",
  normal: "datebox-md",
  large: "datebox-lg",
};

export const Datebox: React.FC<DateboxProps> = forwardRef<
  HTMLInputElement,
  DateboxProps
>(
  (
    {
      variant = "white",
      type = "text",
      label,
      className,
      size = "normal",
      ...rest
    },
    ref
  ) => {
    const classes = classNames(
      "datebox",
      "w-full",
      className,
      { [`datebox-${variant}`]: variant },
      { [`${sizeClasses[size]}`]: size }
    );
    return (
      <>
        <label className="mb-2" htmlFor="">{label}</label>
        <input ref={ref} type='date' className={classes} {...rest} />
      </>
    );
  }
);

export default Datebox;
