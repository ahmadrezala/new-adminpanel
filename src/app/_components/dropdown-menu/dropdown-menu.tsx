import React, { useEffect, useRef } from "react";
import { DropdownMenuProps } from "./dropdown-menu.types";

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  toggleMenu,
  children,
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      toggleMenu();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={`flex-col w-[300px] ${
        isOpen ? "flex" : "hidden"
      } bg-white text-black py-3 rounded-md absolute top-[20px] left-0 z-40`}
    >
      {children}
    </div>
  );
};
