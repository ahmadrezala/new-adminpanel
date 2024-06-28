import LinkItem from "./link-Item";
import { LinkItemsProps } from "./link-item.types";

const LinkItems: React.FC<LinkItemsProps> = ({ links }) => (
  <div className="mt-[40px]">
    {links.map((link) => (
      <LinkItem href={link.href} label={link.label} icon={link.icon} />
    ))}
  </div>
);

export default LinkItems;
