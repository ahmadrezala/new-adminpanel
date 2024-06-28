import { InputHTMLAttributes } from "react";
import { ComponentBase } from "../types/component-base.type";


type TextboxType = "text" | "number" | "email" | "password" | "file";

export type TextboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & ComponentBase & {

    type?: TextboxType,
    label: string
}

