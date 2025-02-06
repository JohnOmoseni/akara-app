import Button from "@/components/reuseables/CustomButton";
import { Modal } from "@/components/ui/components/Modal";
import { EyeOff, Plus, RemoveCircle, WalletCard } from "@/constants/icons";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { FundWallet, WithdrawFund } from "./balance-modal";
import { MinusCircle, PlusCircle } from "@/constants/icons";
import { Link } from "react-router-dom";
import { exportToCSV, formatDate } from "@/lib";
import EmptyListWithIcon from "../_sections/empty-list";
import { setSelectedTab } from "@/redux/features/appSlice";
import { useAppDispatch } from "@/types";

type Props = {
	profileInfo: any;
	children: ReactNode;
};

function Balance({ profileInfo, children }: Props) {
	const [openModal, setOpenModal] = useState<false | "fund" | "withdraw">(
		false
	);
	return (
		<>
			<div className="flex-column gap-8 sm:gap-10">
				<div className="relative pt-9 sm:pt-10 pb-8 px-4 sm:px-6 bg-secondary isolate h-[max(240px,_38vh)] rounded-lg shadow-sm overflow-hidden">
					<div className="flex-column gap-3 text-secondary-foreground h-full w-[90%] min-[500px]:w-[70%]">
						<h3 className="font-semibold text-base">Available Balance</h3>

						<h1 className="text-3xl md:text-4xl font-semibold grid grid-cols-[max-content_max-content] items-center gap-2 leading-none">
							₦2,000,000
							<EyeOff className="size-5 cursor-pointer" />
						</h1>

						<div className="row-flex-btwn gap-6 mt-auto">
							<Button
								title="Fund"
								onClick={() => setOpenModal("fund")}
								icon={Plus}
								dir="right"
								className="bg-white text-foreground-variant min-w-[100px] md:min-w-[130px]"
							/>

							<Button
								title="Withdraw"
								icon={RemoveCircle}
								dir="right"
								onClick={() => setOpenModal("withdraw")}
								className="bg-white text-foreground-variant min-w-[100px] md:min-w-[130px]"
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
						<FundWallet closeModal={() => setOpenModal(false)} />
					</Modal>
				)}

				{openModal && (
					<Modal
						openModal={openModal === "withdraw"}
						isTopContent={<div />}
						setOpenModal={() => setOpenModal(false)}
					>
						<WithdrawFund closeModal={() => setOpenModal(false)} />
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
						{transactions?.slice(0, 5)?.map((tx: any) => {
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
