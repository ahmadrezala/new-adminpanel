export type LinkItemProps = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

export type LinkItemsProps = {
  links: LinkItemProps[];
};
