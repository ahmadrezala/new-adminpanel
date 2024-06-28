import React, { forwardRef } from "react";
import { SelectBoxProps } from "./selectbox.types";
import { Size } from "../types/size.type";
import classNames from "classnames";
import { IconChevronLeft } from "../icons/icons";

const sizeClasses: Record<Size, string> = {
  tiny: "selectbox-xs",
  small: "selectbox-sm",
  normal: "selectbox-md",
  large: "selectbox-lg",
};

const SelectBox: React.FC<SelectBoxProps> = forwardRef<
  HTMLSelectElement,
  SelectBoxProps
>(
  ({
    options,
    variant = "ghost",
    label,
    className,
    size = "normal",
    ...rest
  },ref) => {
    const classes = classNames(
      "textbox",
      "w-full",
      className,
      { [`selectbox-${variant}`]: variant },
      { [`${sizeClasses[size]}`]: size }
    );

    return (
      <div className="relative inline-block w-full">
        <label htmlFor="">{label}</label>
        <select className={classes} ref={ref} {...rest}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <IconChevronLeft className="absolute left-[16px] rotate-[-90deg] bottom-[12px]"/>
       
      </div>
    );
  }
);

export default SelectBox;
