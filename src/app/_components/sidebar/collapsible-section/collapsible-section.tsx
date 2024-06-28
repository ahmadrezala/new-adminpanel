"use client";

import Link from "next/link";
import { useState } from "react";
import { CollapsibleSectionProps } from "./collapsible-section types";
import { IconChevronLeft } from "../../icons/icons";

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  links,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="link p-0 flex gap-2 cursor-pointer "
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon}
        <div className="ml-auto">{title}</div>
        <IconChevronLeft/>
      </div>

      <nav
        className={`w-full overflow-hidden px-8  ${
          isOpen ? "h-auto" : "h-[0px]"
        }`}
      >
        {links.map((link) => (
          <Link
            className="flex text-[13px] px-[20px] py-[10px]"
            href={link.href}
            passHref
            key={link.href}
          >
            {link.icon && link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default CollapsibleSection;
