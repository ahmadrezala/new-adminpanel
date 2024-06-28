import { SelectHTMLAttributes } from "react";
import { ComponentBase } from "../types/component-base.type";

export type SelectBoxProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & ComponentBase &  {
    options: { value: number; label: string }[];
    label: string;
};
