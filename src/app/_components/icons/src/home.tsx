'use client'
import BaseIcon from "@/app/_components/icons/base-icon";
import type { SvgIcon } from "@/app/_components/icons/icon.types";

export default function SvgIcon(props:SvgIcon) {
  return (
    <BaseIcon {...props}>
      <polygon points="19 10 19 21 14 21 14 14 10 14 10 21 5 21 5 10 12 3 19 10"/>
    </BaseIcon>
  );
}