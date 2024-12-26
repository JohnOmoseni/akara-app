import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import SelectDropdown from "../ui/components/SelectDropdown";

type Props = {
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
  isSelected?: string;
  options?: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  isArrowDown?: boolean;
  containerStyles?: string;
};

const defaultOptions = [
  { label: "All", value: "all" },
  { label: "Verified", value: "Verified" },
  { label: "Not-verified", value: "Not Verified" },
];

function Filters({
  setValue,
  value,
  options = defaultOptions,
  placeholder,
  containerStyles,
}: Props) {
  const handleClick = (filter: string) => {
    setValue(filter);
  };

  return (
    <>
      <div className={cn("block", containerStyles)}>
        <SelectDropdown
          value={value}
          defaultValue={options[0]}
          options={options}
          placeholder={placeholder}
          onChangeHandler={handleClick}
          triggerStyles="sm:min-w-[120px]"
        />
      </div>
    </>
  );
}

export default Filters;
