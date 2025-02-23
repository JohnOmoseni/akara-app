import Button from "@/components/reuseables/CustomButton";
import { ReactNode } from "react";

type Props = {
	closeModal: () => void;
	info: ReactNode;
	cancelText?: string;
	actionText: string;
	action: () => void;
};

export const ConfirmAction = ({
	info,
	closeModal,
	cancelText,
	actionText,
	action,
}: Props) => {
	return (
		<div className="flex-column gap-6">
			<p className="text-center leading-5 max-w-[40ch] px-2 mx-auto">{info}</p>

			<div className="flex-column min-[500px]:row-flex gap-x-4 gap-y-2">
				<Button
					title={cancelText || "Cancel"}
					variant="outline"
					onClick={closeModal}
					className="flex-1 max-[500px]:order-2 w-full"
				/>
				<Button
					title={actionText}
					type="submit"
					onClick={() => action()}
					className="flex-1 max-[500px]:order-1 w-full"
				/>
			</div>
		</div>
	);
};
