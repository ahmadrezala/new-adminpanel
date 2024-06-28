import { Loading } from "../loading";
import { Size } from "../types/size.type";
import { ButtonProps } from "./button.types";
import classNames from "classnames";

const sizeClasses: Record<Size, string> = {
  tiny: "",
  small: "btn-small",
  normal: "btn-md",
  large: "btn-lg",
};

export const Button: React.FC<ButtonProps> = ({
  variant,
  size = "normal",
  isDisabled = false,
  isOutline = false,
  type = "button",
  isLoading = false,
  loadingType = "spinner",
  loadingText = "در حال ارسال درخواست",
  children,
  className,
  ...rest
}: ButtonProps) => {
  const classes = classNames(
    "btn",
    className,
    { [`btn-${variant}`]: variant },
    { [`${sizeClasses[size]}`]: size },
    { "btn-outline": isOutline },
    { "pointer-events-none opacity-80": isLoading }
  );

  return (
    <button type={type} disabled={isDisabled} className={classes} {...rest}>
          {isLoading && <Loading type={loadingType} />}
      {children}
    </button>
  );
};
