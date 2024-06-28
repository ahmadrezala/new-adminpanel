import { ComponentBase } from "../types/component-base.type";



export type LinkProps = ComponentBase & {
    href: string;
    children?: React.ReactNode;
}