import Button from "@/components/reuseables/CustomButton";
import { Modal } from "@/components/ui/components/Modal";
import {
	CloudDownload,
	EyeOff,
	Plus,
	RemoveCircle,
	WalletCard,
} from "@/constants/icons";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { FundWallet, WithdrawFund } from "./balance-modal";
import { MinusCircle, PlusCircle } from "@/constants/icons";
import { Link } from "react-router-dom";
import { exportToCSV, formatDate } from "@/lib";
import { setSelectedTab } from "@/redux/features/appSlice";
import { useAppDispatch } from "@/types";
import { ConfirmAction } from "../_sections/confirm-action";
import { useWithdrawMutation } from "@/server/actions/transactions";
import { toast } from "sonner";
import EmptyListWithIcon from "../_sections/empty-list";

type Props = {
	profileInfo?: any;
	balance: string | null;
	children: ReactNode;
	bankInfo: any;
	currentTxn: any;
	refetchProfile: any;
	setCurrentTxn: React.Dispatch<React.SetStateAction<CurrentTxnParams>>;
	setStatusOpenModal: React.Dispatch<
		React.SetStateAction<false | "withdraw-success" | "fund-success">
	>;
};

function Balance({
	balance,
	bankInfo,
	children,
	currentTxn,
	refetchProfile,
	setCurrentTxn,
	setStatusOpenModal,
}: Props) {
	const [openModal, setOpenModal] = useState<
		false | "fund" | "withdraw" | "confirm"
	>(false);
	const [withdrawMutation, { isLoading: isWithdrawing }] =
		useWithdrawMutation();

	const handleWithdraw = async () => {
		let message;
		const data = { amount: String(currentTxn?.amount) };

		try {
			const res = await withdrawMutation(data);
			if (res?.error) {
				message = (res.error as any)?.error || "An error occured";
				throw new Error(message);
			}

			message = res?.data?.message || "Withdrawal successfully";
			setOpenModal(false);
			refetchProfile?.();
			setStatusOpenModal("withdraw-success");
		} catch (error: any) {
			const message = error.message || "An error occured";
			toast.error(message);
		}
	};

	return (
		<>
			<div className="flex-column gap-8 sm:gap-10">
				<div className="relative pt-9 sm:pt-10 pb-8 px-4 sm:px-6 bg-secondary isolate h-[max(220px,_35vh)] rounded-lg shadow-sm overflow-hidden">
					<div className="flex-column gap-3 text-secondary-foreground h-full w-[90%] sm:w-[70%]">
						<h3 className="font-semibold text-base">Available Balance</h3>

						<h1 className="text-3xl md:text-4xl font-semibold grid grid-cols-[max-content_max-content] items-center gap-2 leading-none text-secondary-foreground">
							₦{balance}
							<EyeOff className="size-5 cursor-pointer" />
						</h1>

						<div className="row-flex-btwn gap-6 mt-auto">
							<Button
								title="Fund"
								onClick={() => setOpenModal("fund")}
								icon={Plus}
								dir="right"
								className="bg-white text-foreground-variant max-sm:min-w-[100px] md:min-w-[130px]"
							/>

							<Button
								title="Withdraw"
								icon={RemoveCircle}
								dir="right"
								onClick={() => setOpenModal("withdraw")}
								className="bg-white text-foreground-variant max-sm:min-w-[100px] md:min-w-[130px]"
							/>
						</div>
					</div>

					<div className="absolute inset-0 bg-black/10 pointer-events-none -z-10" />

					<WalletCard className="absolute -top-2 -right-3 max-[400px]:size-52 size-60 -z-10" />
				</div>

				{children}
			</div>

			<>
				{openModal && (
					<Modal
						openModal={openModal === "fund"}
						isTopContent={<div />}
						setOpenModal={() => setOpenModal(false)}
					>
						<FundWallet
							bankInfo={bankInfo}
							closeModal={() => setOpenModal(false)}
							setOpenModal={setOpenModal}
						/>
					</Modal>
				)}

				{openModal && (
					<Modal
						openModal={openModal === "withdraw"}
						isTopContent={<div />}
						setOpenModal={() => setOpenModal(false)}
					>
						<WithdrawFund
							bankInfo={{ ...bankInfo, balance }}
							closeModal={() => setOpenModal(false)}
							setOpenModal={setOpenModal}
							setCurrentTxn={setCurrentTxn}
						/>
					</Modal>
				)}

				{openModal && (
					<Modal
						openModal={openModal === "confirm"}
						isTopContent={<div />}
						modalStyles="min-h-[100px]"
					>
						<ConfirmAction
							closeModal={() => setOpenModal(false)}
							info={
								<>
									You are about to withdraw <br />{" "}
									<span className="font-semibold">₦{currentTxn?.amount}</span>
									<br />
									from your wallet into your registered bank account
									<span className="flex-column gap-1 mt-1.5">
										<span className="font-semibold">
											{" "}
											Account Number: {bankInfo?.acc_number}
										</span>
										<span className="font-semibold">
											{" "}
											Bank Name: {bankInfo?.bank_name}
										</span>
										<span className="font-semibold">
											{" "}
											Account Name: {bankInfo?.acc_name}
										</span>
									</span>
								</>
							}
							action={() => handleWithdraw()}
							actionText={isWithdrawing ? "Withdrawing..." : "Withdraw"}
							cancelText="Go back"
						/>
					</Modal>
				)}
			</>
		</>
	);
}
export default Balance;

export const Transactions = ({ data }: { data: any }) => {
	const dispatch = useAppDispatch();
	const transactions = useMemo(
		() =>
			data?.transactions?.map(
				({ amount, description, created_at, type }: any) => ({
					id: created_at,
					amount: amount ? `₦${amount}` : "₦0",
					desc: description || "",
					date: formatDate(created_at, "D MMM, YYYY"),
					time: formatDate(created_at, "h:mm A"),
					type: type || "debit",
				})
			) || [],
		[data?.transactions]
	);

	const downloadCsv = useCallback(() => {
		exportToCSV({
			headers: ["Amount", "Description", "Date", "Time", "Type"],
			data: transactions,
			filename: "transactions",
			mapData: (tx: any) => [tx.amount, tx.desc, tx.date, tx.time, tx.type],
		});
	}, [transactions]);

	return (
		<div className="flex-column gap-4">
			<div className="row-flex-btwn gap-4">
				<h3 className="font-semibold">Transaction History</h3>

				{transactions?.length > 0 && (
					<Link
						to="/all-transactions"
						onClick={() => {
							dispatch(setSelectedTab("All Transactions"));
						}}
						className="font-semibold leading-3 text-secondary-100 mt-px text-xs tracking-wide"
					>
						View all
					</Link>
				)}
			</div>

			{transactions?.length > 0 ? (
				<>
					<ul className="flex-column gap-5">
						{transactions?.slice(0, 3)?.map((tx: any) => {
							return (
								<li
									key={tx?.id}
									className="grid grid-cols-[max-content_1fr] gap-2"
								>
									{tx.type === "credit" ? (
										<PlusCircle className="size-4 text-green-500 mt-0.5" />
									) : (
										<MinusCircle className="size-4 text-red-500 mt-0.5" />
									)}

									<div className="flex-column gap-1 w-full">
										<p className="text-sm break-all">{tx?.desc}</p>

										<p className="text-xs  text-grey row-flex-start gap-2 tracking-wide">
											{tx?.date}
											<span className="size-2 bg-grey-100 rounded-full clip-circle" />
											{tx?.time}
										</p>
									</div>
								</li>
							);
						})}
					</ul>

					<Button
						title="Download transaction history"
						variant="outline"
						icon={CloudDownload}
						onClick={downloadCsv}
						className="text-foreground-variant border-none shadow-none sm:mt-4 ml-4 w-max"
					/>
				</>
			) : (
				<EmptyListWithIcon
					title="No transactions yet!"
					textSize={"lg"}
					iconVariant={"hide-icon"}
				/>
			)}
		</div>
	);
};
