import Link from "next/link";
import React from "react";
import { LinkItemProps } from "./link-item.types";

const LinkItem: React.FC<LinkItemProps> = ({ href, label, icon }) => (
  <Link className="flex link gap-2" href={href} key={href} passHref>
    {icon}
    {label}
  </Link>
);

export default LinkItem;
