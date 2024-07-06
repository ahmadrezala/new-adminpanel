import React, { useState, useEffect, useRef } from "react";

interface Option {
  value: number;
  label: string;
}

interface SelectedOption {
  value: number;
  label: string;
}

interface MultiSelectBoxProps {
  label: string;
  options: Option[];
  value: SelectedOption[];
  onChange: (selected: SelectedOption[]) => void;
}

const MultiSelectBox: React.FC<MultiSelectBoxProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: Option) => {
    let newValue: SelectedOption[];
    if (value.some((v) => v.value === option.value)) {
      newValue = value.filter((v) => v.value !== option.value);
    } else {
      newValue = [...value, option];
    }
    onChange(newValue);
  };

  const getDisplayValue = () => {
    if (value.length === 0) {
      return "Select options";
    }
    if (value.length <= 2) {
      return value.map((val) => val.label).join(", ");
    }
    const displayedOptions = value
      .slice(0, 2)
      .map((val) => val.label)
      .join(", ");
    return `${displayedOptions}, ...`;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-full" ref={ref}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="multi-selectbox-ghost mt-2" onClick={() => setIsOpen(!isOpen)}>
        {getDisplayValue()}
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-dark-navy border-[1px] border-solid border-charcoal rounded shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className={`p-2 pb-0 cursor-pointer hover:bg-[#acabab6e] ${
                value.some((v) => v.value === option.value) ? "bg-gray-200" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectBox;
