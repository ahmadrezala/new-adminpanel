import { Size } from "../types/size.type";
import classNames from "classnames";
import { LinkProps } from "./link-button.types";
import Link from "next/link";

const sizeClasses: Record<Size, string> = {
  tiny: "",
  small: "btn-small",
  normal: "btn-md",
  large: "btn-lg",
};

export const LinkButton: React.FC<LinkProps> = ({
  variant,
  size = "normal",
  href,
  children,
  className,
  ...rest
}: LinkProps) => {
  const classes = classNames(
    "btn",
    className,
    { [`btn-${variant}`]: variant },
    { [`${sizeClasses[size]}`]: size }
  );

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
};
