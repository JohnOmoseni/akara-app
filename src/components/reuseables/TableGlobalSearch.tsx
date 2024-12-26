import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/constants/icons";
import { useEffect, useState } from "react";

type TableGlobalSearchProps = {
  containerStyles?: string;
  placeholder?: string;
  globalValue: string;
  hideIcon?: boolean;
  onChange: (value: string) => void;
};

function TableGlobalSearch({
  onChange,
  globalValue,
  containerStyles,
  hideIcon = false,
  placeholder,
}: TableGlobalSearchProps) {
  const [value, setValue] = useState(globalValue);

  useEffect(() => {
    setValue(globalValue);
  }, [globalValue]);

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), 200);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div
      className={cn(
        "row-flex-start min-[450px]:w-48 rounded-md border border-border-100 py-0.5",
        !hideIcon && "px-3 max-[430px]:px-2.5",
        containerStyles
      )}
    >
      {!hideIcon && <SearchIcon className="size-5 text-grey" />}
      <Input
        value={value}
        placeholder={placeholder ?? "Search..."}
        className="i-reset h-7 sm:h-8"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}

export default TableGlobalSearch;
