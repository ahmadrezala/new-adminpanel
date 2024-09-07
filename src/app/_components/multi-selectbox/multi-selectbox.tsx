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
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleRemoveOption = (option: Option) => {
    const newValue = value.filter((v) => v.value !== option.value);
    onChange(newValue);
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

  const filteredOptions = options && options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative inline-block w-full" ref={ref}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div
        className="multi-selectbox-white  mt-2 flex flex-wrap gap-1 items-center border  px-2 py-1 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.length === 0 ? (
          <span className="text-gray-400">انتخاب کنید...</span>
        ) : (
          value.map((val) => (
            <div
              key={val.value}
              className="bg-gray-200 rounded-full bg-dark-navy text-white px-3 py-1 flex justify-between items-center"
            >
              {val.label}
              <span
                className="mr-2 text-error-content cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveOption(val);
                }}
              >
                &times;
              </span>
            </div>
          ))
        )}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-dark-navy border-[1px] border-solid border-charcoal rounded shadow-lg max-h-60 overflow-auto">
          <input
            type="text"
            className="w-full px-3 py-2 border-b border-gray-300"
            placeholder="جستجو کنید..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <ul>
            {filteredOptions.length === 0 ? (
              <li className="p-2 text-gray-400">موردی یافت نشد</li>
            ) : (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={`p-2 cursor-pointer hover:bg-[#acabab6e] ${
                    value.some((v) => v.value === option.value)
                      ? "bg-gray-200"
                      : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectBox;
