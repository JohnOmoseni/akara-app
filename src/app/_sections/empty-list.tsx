import Button from "@/components/reuseables/CustomButton";
import { NoSearch, Plus } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const iconVariants = cva("size-fit", {
	variants: {
		iconVariant: {
			default: "",
			"hide-icon": "hidden",
		},
		iconSize: {
			default: "size-fit",
			sm: "size-8",
			lg: "size-10",
		},
		defaultVariants: {
			variant: "default",
			iconSize: "default",
		},
	},
});

const titleVariants = cva("text-center", {
	variants: {
		color: {
			default: "",
			secondary: "text-foreground-variant",
		},
		textSize: {
			default: "text-2xl",
			sm: "text-lg",
			lg: "text-xl",
		},
	},
	defaultVariants: {
		color: "default",
		textSize: "default",
	},
});

type IconVariantsProps = VariantProps<typeof iconVariants>;
type TitleVariantsProps = VariantProps<typeof titleVariants>;

interface EmptyListProps extends IconVariantsProps, TitleVariantsProps {
	title?: string;
	buttonTitle?: string;
	action?: () => void;
	// type?: "no-item" | "error";
}

const EmptyListWithIcon = ({
	title,
	buttonTitle,
	action,
	iconVariant,
	textSize,
	iconSize,
	color,
}: EmptyListProps) => {
	return (
		<div className="flex-column gap-6 md:gap-8 items-center justify-center empty-list min-h-[200px]">
			{iconVariant !== "hide-icon" && (
				<NoSearch className={cn(iconVariants({ iconVariant, iconSize }))} />
			)}

			<h2 className={cn(titleVariants({ color, textSize }))}>{title}</h2>
			{buttonTitle && (
				<Button
					icon={Plus}
					title={buttonTitle}
					className="group-hover:scale-95 mt-4"
					onClick={() => action?.()}
				/>
			)}
		</div>
	);
};

export default EmptyListWithIcon;
