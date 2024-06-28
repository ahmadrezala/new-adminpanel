import { LinkItemProps } from "../link-item/link-item.types";

type LinkItem = LinkItemProps;

export type CollapsibleSectionProps = {
  title: string;
  icon?: React.ReactNode;
  links: LinkItem[];
};


export type SectionItemsProps = {
  sections: CollapsibleSectionProps[];
};