import Button from "@/components/reuseables/CustomButton";
import { confetti, ErrorIcon } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SuccessModalProps = {
	info: ReactNode;
	type: "success" | "error";
	onButtonClick: () => void;
	buttonStyle?: string;
};
function SuccessModal({
	info,
	type = "success",
	onButtonClick,
	buttonStyle,
}: SuccessModalProps) {
	return (
		<div className="relative mb-1.5">
			<div className="flex-column items-center gap-5">
				{type === "success" ? (
					<img src={confetti} alt="icon" className="h-fit w-fit sm:w-24" />
				) : (
					// <Confetti className="h-fit w-fit sm:w-24" />
					<ErrorIcon className="h-fit w-fit sm:w-24" />
				)}
			</div>

			<div className="flex-column mt-4 items-center gap-6 md:gap-8">
				<p className="max-w-[40ch] px-2 text-center leading-5 ">{info}</p>

				<Button
					onClick={onButtonClick}
					title={"Close"}
					variant={"outline"}
					className={cn("w-full", buttonStyle)}
				/>
			</div>
		</div>
	);
}

export default SuccessModal;
