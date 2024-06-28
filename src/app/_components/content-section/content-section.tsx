import { LinkButton } from "../link-button";
import { Pagination } from "../pagination";
import { ContentSectionProps } from "./content-section.types";

export const ContentSection = <T,>({
  title,
  linkPath,
  linkText,
  dataList,
  currentPage,
  totalPages,
  renderList,
}: ContentSectionProps<T>) => (
  <div className="p-[36px] mt-[60px] border-[1px] border-solid border-charcoal bg-dark-navy rounded-3xl w-[80%]">
    <div className="text-white flex justify-between pb-[20px] border-b-[1px] border-solid border-charcoal">
      <div className="text-[20px]">{title}</div>
      <LinkButton variant="charcoal" href={linkPath} className="text-[18px]">
        {linkText}
      </LinkButton>
    </div>
    {renderList(dataList)}
    <div className="flex justify-center mt-[20px] pt-[20px] border-t-[1px] border-t-charcoal">
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  </div>
);
