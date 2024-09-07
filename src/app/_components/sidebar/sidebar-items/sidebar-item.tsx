import { IconAttribute, IconBrand, IconCategory, IconHome, IconTag } from "../../icons/icons";

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
  { type: "link", href: "/admin_panel", label: "دشبورد", icon: <IconHome /> },
  {
    type: "link",
    href: "/admin_panel/brands",
    label: "برندها",
    icon: <IconBrand viewBox = '0 -2 24 28' />,
  },
  {
    type: "link",
    href: "/admin_panel/attributes",
    label: "ویژگی ها",
    icon: <IconCategory />,
  },
  {
    type: "link",
    href: "/admin_panel/tags",
    label: "تگ ها",
    icon: <IconTag viewBox = '0 5 31 24'/>,
  },
  {
    type: "link",
    href: "/admin_panel/categories",
    label: "دسته بندی ها",
    icon: <IconCategory />,
  },
  {
    type: "link",
    href: "/admin_panel/products",
    label: "محصولات",
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

];
