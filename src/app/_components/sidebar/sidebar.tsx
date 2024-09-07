import React from "react";
import LinkItems from "./link-item/link-items";
import SectionItems from "./collapsible-section/section-items";
import { sidebarItems } from "./sidebar-items/sidebar-item";
import { CollapsibleSectionProps } from "./collapsible-section/collapsible-section types";
import { LinkItemProps } from "./link-item/link-item.types";
import { IconSquar, IconBurger } from "../icons/icons";
import SidebarUserSection from "./sidebar-user-section";

export const Sidebar: React.FC = async () => {
  const linkItems = sidebarItems.filter(
    (item) => item.type === "link"
  ) as LinkItemProps[];
  const sectionItems = sidebarItems.filter(
    (item) => item.type === "section"
  ) as CollapsibleSectionProps[];


  return (
    <aside className="grid grid-rows-[90px_186px_auto__auto_60px]  overflow-y-scroll dark:bg-dark-navy h-screen">
      <div className="flex px-[32px] items-center">
        <div className="flex  gap-2 ml-auto items-center">
          <IconSquar width={30} height={30} />
          <h1 className="text-[22px] capitalize">دشبورد</h1>
        </div>
        <IconBurger />
      </div>

      <SidebarUserSection />

      <LinkItems links={linkItems} />

      <SectionItems sections={sectionItems} />

      <div></div>
    </aside>
  );
};
