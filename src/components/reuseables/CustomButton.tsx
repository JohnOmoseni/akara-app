import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { FC } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const buttonVariants = cva(
	"row-flex sm:whitespace-nowrap leading-4 max-sm:text-sm py-3 rounded-md border font-semibold capitalize tracking-wide subpixel-antialiased shadow-sm filter transition duration-150 active:translate-y-0.5 active:brightness-90 disabled:border-none disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"border-border-variant w-max bg-secondary text-secondary-foreground disabled:cursor-not-allowed  disabled:opacity-50 disabled:brightness-90",
				outline: "border-border-100 text-foreground",
			},
			size: {
				default: "sm:h-10 px-4",
				sm: "px-3",
				lg: "md:py-4 2xl:h-12",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

type ButtonVariantsProps = VariantProps<typeof buttonVariants>;

interface ButtonProps extends ButtonVariantsProps {
	title: string;
	className?: string;
	type?: "button" | "submit" | "reset";
	icon?: any;
	isLoading?: boolean;
	dir?: "left" | "right";
	disabled?: boolean;
	onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({
	title,
	className,
	type = "button",
	dir = "left",
	icon: Icon,
	onClick,
	isLoading = false,
	disabled = false,
	variant,
	size,
}) => {
	return (
		<button
			type={type}
			disabled={disabled || isLoading}
			onClick={onClick}
			className={cn(
				buttonVariants({ variant, size }),
				className,
				Icon && "grid grid-cols-[1fr,_max-content] gap-2"
			)}
		>
			{isLoading ? (
				<ClipLoader
					size={20}
					aria-label="Loading"
					data-testid="loader"
					className="row-flex mr-1.5 text-foreground-variant"
				/>
			) : (
				<>
					{Icon && dir === "left" && <Icon className="size-6 font-semibold" />}
					{title}
					{Icon && dir === "right" && <Icon className="size-6 font-semibold" />}
				</>
			)}
		</button>
	);
};

export default Button;
