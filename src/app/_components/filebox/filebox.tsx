"use client";
import React, { forwardRef} from "react";
import { IconUpload } from "../icons/icons";
import { FileboxProps } from "./filebox.types";
import classNames from "classnames";
import { Size } from "../types/size.type";

const sizeClasses: Record<Size, string> = {
  tiny: "file-input-xs",
  small: "file-input-sm",
  normal: "file-input-md",
  large: "file-input-lg",
};

const Filebox: React.FC<FileboxProps> = forwardRef<
  HTMLInputElement,
  FileboxProps
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
      "file-input",
      "w-full",
      className,
      { [`file-input-${variant}`]: variant },
      { [`${sizeClasses[size]}`]: size }
    );

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      (e.currentTarget.children[0] as HTMLInputElement).click();
    };

    return (
      <div className="w-full">
        <label htmlFor="file" className="">
          {label}
        </label>
        <div id="file" onClick={(e) => handleClick(e)} className={classes} >
          <input type="file" ref={ref} className="hidden"  {...rest} />
          <div>انتخاب فایل</div>
          <IconUpload />
        </div>
      </div>
    );
  }
);

export default Filebox;
