import { InputHTMLAttributes } from "react";
import { ComponentBase } from "../types/component-base.type";




export type TextareaProps = Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'size'> & ComponentBase & {

    label: string
}

