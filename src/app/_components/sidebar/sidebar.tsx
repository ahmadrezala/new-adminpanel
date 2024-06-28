import React from "react";
import LinkItems from "./link-item/link-items";
import SectionItems from "./collapsible-section/section-items";
import { sidebarItems } from "./sidebar-items/sidebar-item";
import { CollapsibleSectionProps } from "./collapsible-section/collapsible-section types";
import { LinkItemProps } from "./link-item/link-item.types";
import Image from "next/image";
import { IconSquar , IconBurger } from "../icons/icons";


export const Sidebar: React.FC = () => {
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
        <IconSquar width={30} height={30}/>
          <h1 className="text-[22px] capitalize">دشبورد</h1>
        </div>
        <IconBurger/>

      </div>
      <div className="px-8">
        <div className="border-charcoal flex flex-col gap-1 justify-center items-center border-b-[1px] h-full">
          <Image src="/images/prof2.jpg" style={{ borderRadius: "50px" }} width={70} height={70} alt=""/>
          <h3 className="text-[18px]">احمدرضا</h3>
          <h6>ادمین</h6>
    
        </div>
      </div>

      <LinkItems links={linkItems} />

      <SectionItems sections={sectionItems} />

      <div></div>
    </aside>
  );
};
