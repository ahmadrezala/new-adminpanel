type HeaderSectionProps = {
  title: string;
};

export const HeaderSection: React.FC<HeaderSectionProps> = ({ title }) => (
  <div className="px-[32px] w-full">
    <div className="bg-top-section text-[40px] font-extrabold items-center flex px-[10%] w-full h-[250px]">
      {title}
    </div>
  </div>
);
