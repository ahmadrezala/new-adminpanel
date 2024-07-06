"use client";
import Link from "next/link";
import React from "react";
import { LinkItemProps } from "./link-item.types";
import { usePathname } from "next/navigation";

const LinkItem: React.FC<LinkItemProps> = ({ href, label, icon, ...rest }) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      className={`flex gap-2 link ${isActive ? "link-active" : ""}`}
      {...rest}
      href={href}
      key={href}
      passHref
    >
      {icon}
      {label}
    </Link>
  );
};

export default LinkItem;
