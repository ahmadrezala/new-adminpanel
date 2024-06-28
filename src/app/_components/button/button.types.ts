import { ButtonHTMLAttributes } from "react";
import { ComponentBase } from "../types/component-base.type";
import { LoadingBehavior } from "../types/loading-behavior.type";




export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & LoadingBehavior & ComponentBase & {
    isOutline?: boolean;
}