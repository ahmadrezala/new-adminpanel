import { IconHome } from "../../icons/icons";

interface LinkItem {
  type: "link";
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface Section {
  type: "section";
  title: string;
  icon?: React.ReactNode;
  links: LinkItem[];
}

type SidebarItem = LinkItem | Section;

export const sidebarItems: SidebarItem[] = [
  { type: "link", href: "/dashboard", label: "دشبورد", icon: <IconHome /> },
  {
    type: "link",
    href: "/admin_panel/brands",
    label: "برندها",
    icon: <IconHome />,
  },
  {
    type: "link",
    href: "/dashboard/help",
    label: "راهنما",
    icon: <IconHome />,
  },
  {
    type: "section",
    title: "تنظیمات",
    icon: <IconHome />,
    links: [
      { type: "link", href: "/dashboard/settings/general", label: "ایتم ها" },
      { type: "link", href: "/dashboard/settings/privacy", label: "فروشندگان" },
    ],
  },
  {
    type: "section",
    title: "تنظیمات",
    icon: <IconHome />,
    links: [
      { type: "link", href: "/dashboard/settings/general", label: "ایتم ها" },
      { type: "link", href: "/dashboard/settings/privacy", label: "فروشندگان" },
    ],
  },
];
