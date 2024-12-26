import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/constants/icons";
import { useEffect, useState } from "react";

type TableSearchProps = {
	containerStyles?: string;
	initialValue?: string;
	placeholder?: string;
	setColumnFilters?: any;
	filterBy?: string;
	debounce?: number;
};

function DebouncedSearchInput({
	initialValue,
	setColumnFilters,
	containerStyles,
	debounce = 100,
	placeholder,
	filterBy = "name",
}: TableSearchProps) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(
			() => onFilterChange(filterBy, value!),
			debounce
		);

		return () => clearTimeout(timeout);
	}, [value]);

	const onFilterChange = (columnId: string, value: string) => {
		setColumnFilters((prev: any) =>
			prev
				?.filter((filter: any) => filter.id !== columnId)
				?.concat({ id: columnId, value })
		);
	};

	return (
		<div
			className={cn(
				"row-flex-start w-48 rounded-md border border-border px-3.5 py-1 max-[430px]:px-2.5 sm:w-[250px] lg:w-[300px]",
				containerStyles
			)}
		>
			<SearchIcon className="size-5 text-grey" />
			<Input
				value={value}
				placeholder={placeholder ?? "Search..."}
				className="i-reset !pl-2 sm:!pl-3"
				onChange={(e) => onFilterChange(filterBy, e.target.value)}
			/>
		</div>
	);
}

export default DebouncedSearchInput;
