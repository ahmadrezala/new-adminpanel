import React from "react";
import { Changelanguage } from "../change_language/change_language";

export const Header: React.FC = () => {
  return (
    <header className="dark:bg-dark-navy px-[40px] ">
      <div className="container h-full flex items-center justify-between">
        <Changelanguage />
        <span>nav</span>
      </div>
    </header>
  );
};
