import BaseIcon from "@/app/_components/icons/base-icon";
import { SvgIcon } from "@/app/_components/icons/icon.types";

export default function SvgIcon(props:SvgIcon) {
  return (
    <BaseIcon {...props}>
      <path d="M5 12H20"/><path d="M5 17H20"/><path d="M5 7H20"/>
    </BaseIcon>
  );
}