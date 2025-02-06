import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { ReactNode } from "react";
import { Close } from "@/constants/icons";
import { cn } from "@/lib/utils";

type ModalProps = {
	title?: string;
	description?: string;
	children?: ReactNode;
	openModal: boolean;
	modalStyles?: string;
	isTopContent?: ReactNode;
	setOpenModal?: () => void;
};

export function Modal({
	title,
	description,
	children,
	openModal,
	isTopContent,
	setOpenModal,
	modalStyles,
}: ModalProps) {
	return (
		<AlertDialog
			open={openModal}
			onOpenChange={() => (setOpenModal ? setOpenModal() : null)}
		>
			{/* we will trigger the opening of the dialog somewhere else */}

			<AlertDialogContent
				style={{ zIndex: 999 }}
				className={cn(
					"shad-alert-dialog block scrollbar-thin mx-auto max-h-[580px] min-h-[200px] max-w-lg overflow-y-auto rounded-2xl p-4 shadow-lg max-sm:w-[85%] sm:min-w-[400px] sm:p-4 sm:px-5",
					modalStyles
				)}
			>
				<div className="absolute right-3 top-3 ">
					{isTopContent ? (
						isTopContent
					) : (
						<span
							className="icon-div group active:scale-95"
							onClick={setOpenModal}
							title="close"
						>
							<Close
								size="18"
								className="z-[1000] cursor-pointer text-grey transition-colors group-hover:text-foreground"
							/>
						</span>
					)}
				</div>

				<AlertDialogHeader>
					<AlertDialogTitle className="text-xl sm:text-2xl">
						{title}
					</AlertDialogTitle>

					<AlertDialogDescription
						className={cn(
							"max-sm:text-center hidden text-base ml-0.5 line-clamp-3 leading-5",
							description && "block"
						)}
					>
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>

				{children}
			</AlertDialogContent>
		</AlertDialog>
	);
}
