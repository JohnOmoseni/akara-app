import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThreeDots } from "@/constants/icons";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  trigger?: ReactNode;
  list?: any[];
  value?: string;
  containerStyles?: string;
  renderItem?: (item: any, idx: number) => ReactNode;
  handleChange?: (value: string) => void;
};

export function DropdownList({
  trigger,
  list,
  value,
  renderItem,
  containerStyles,
  handleChange,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <div className="icon-div">
            <ThreeDots size={20} className="" />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn("bg-background", containerStyles)}>
        <DropdownMenuRadioGroup value={value} onValueChange={handleChange}>
          {list && list?.length > 0 ? (
            list?.map((item, idx) =>
              renderItem ? (
                renderItem(item, idx)
              ) : (
                <DropdownMenuRadioItem key={item.value} value={item.value}>
                  {item.label}
                </DropdownMenuRadioItem>
              )
            )
          ) : (
            <DropdownMenuRadioItem key="no-option" value="">
              <div className="row-flex text-center w-full">No item</div>
            </DropdownMenuRadioItem>
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
