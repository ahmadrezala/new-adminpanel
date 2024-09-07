import { InputHTMLAttributes } from "react";
import { ComponentBase } from "../types/component-base.type";




export type DateboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & ComponentBase & {

    label?: string
}