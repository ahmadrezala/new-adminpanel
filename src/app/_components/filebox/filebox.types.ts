import { InputHTMLAttributes } from "react"
import { ComponentBase } from "../types/component-base.type"




export type FileboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & ComponentBase & {

    label: string
}