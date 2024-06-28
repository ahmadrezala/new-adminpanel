import React from "react";
import Image from "next/image";

export const Changelanguage: React.FC = () => {
  return (
    <div className="relative">
      <div className="w-[30px] h-[30px] flex rounded-full overflow-hidden">
        <Image
          src="/images/Flag-Iran.webp"
          alt="Flag of Iran"
          width={30}
          height={30}
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* <div className="w-[110px] bg-white rounded-sm absolute top-[40px] right-0">
        <div className="flex gap-2 p-2">
          <Image
            src="/images/Flag-Iran.webp"
            alt="Flag of Iran"
            width={30}
            height={5}
            style={{ objectFit: "cover" }}
          />
          <span className="text-black text-[14px] mr-2">فارسی</span>
        </div>
        <div className="flex gap-2 p-2">
          <Image
            src="/images/us.png"
            alt="Flag of Iran"
            width={30}
            height={5}
            style={{ objectFit: "cover" }}
          />
          <span className="text-black text-[14px] mr-2 capitalize">english</span>
        </div>
      </div> */}
    </div>
  );
};
