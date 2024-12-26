import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Option = { label: ReactNode; value: string };

type SelectProps = {
  options: Option[];
  value?: string;
  defaultValue?: Option;
  placeholder?: ReactNode;
  trigger?: ReactNode;
  triggerStyles?: string;
  isArrowDown?: boolean;

  onChangeHandler?: (value: string) => void;
};

const SelectDropdown = ({
  options,
  defaultValue,
  value,
  placeholder,
  trigger,
  triggerStyles,
  onChangeHandler,
}: SelectProps) => {
  return (
    <Select
      onValueChange={onChangeHandler && onChangeHandler}
      value={value}
      defaultValue={defaultValue?.value}
    >
      <SelectTrigger
        className={cn(
          "shad-select-trigger justify-between capitalize select-trigger",
          triggerStyles
        )}
      >
        {trigger ? trigger : <SelectValue placeholder={placeholder || "Select"} />}
      </SelectTrigger>
      <SelectContent className="shad-select-content">
        {options?.length > 0 ? (
          options.map((option, idx) => {
            // @ts-ignore
            const isAllOption = option.value === "all";
            return (
              <SelectItem key={idx} value={option.value!} className={cn("shad-select-item")}>
                {option.label}
              </SelectItem>
            );
          })
        ) : (
          <SelectItem key={"no-option"} value="null" className={cn("shad-select-item")}>
            No item
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectDropdown;
