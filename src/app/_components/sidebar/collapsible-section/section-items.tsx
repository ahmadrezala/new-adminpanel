import CollapsibleSection from "./collapsible-section";
import { SectionItemsProps } from "./collapsible-section types";
import { IconChevronLeft } from "../../icons/icons";


 const SectionItems: React.FC<SectionItemsProps> = ({ sections }) => (
  <div className="px-8">
    <div className="pt-[20px] mt-[20px] border-charcoal border-t-[1px]">
      {sections.map((section) => (
        <CollapsibleSection
          title={section.title}
          icon={section.icon}
          links={section.links}
        />
      ))}
    </div>
  </div>
);

export default SectionItems;