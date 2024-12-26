import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ThreeDots } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { Fragment, PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren & {
  trigger?: ReactNode;
  list?: any[];
  children?: ReactNode;
  containerStyles?: string;
  renderItem?: (item: any, index: number) => ReactNode;
};

export function PopoverWrapper({ list, trigger, renderItem, children, containerStyles }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <div className="icon-div">
            <ThreeDots size={20} className="" />
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent className={cn("bg-background", containerStyles)}>
        <div className="flex-column gap-3 text-sm">
          {list &&
            list?.map((item, idx) => (
              <Fragment key={idx}>
                {/* Render dropdown items */}
                {renderItem && renderItem(item, idx)}
              </Fragment>
            ))}
        </div>

        {children}
      </PopoverContent>
    </Popover>
  );
}
