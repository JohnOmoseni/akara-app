import { CloudDownload } from "@/constants/icons";
import { useMemo } from "react";
import { MinusCircle, PlusCircle } from "@/constants/icons";
import { Link } from "react-router-dom";
import { formatDate, truncateText } from "@/lib";
import { setSelectedTab } from "@/redux/features/appSlice";
import { useAppDispatch } from "@/types";

import EmptyListWithIcon from "../_sections/empty-list";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TransactionPdf from "../transactions/TransactionPdf";

export const Transactions = ({ data }: { data: any }) => {
	const dispatch = useAppDispatch();
	const transactions = useMemo(
		() =>
			data?.map(({ amount, id, description, created_at, type }: any) => ({
				id,
				amount: amount ? `₦${amount}` : "₦0",
				desc:
					description ||
					`₦${amount} ${
						type === "deposit" ? "credited" : "debited"
					} into your wallet`,
				date: formatDate(created_at, "D MMM, YYYY"),
				time: formatDate(created_at, "h:mm A"),
				type: type || null,
			})) || [],
		[data]
	);

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
										<p className="text-sm break-all">
											{truncateText(tx?.desc)}
										</p>

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

					<PDFDownloadLink
						document={<TransactionPdf data={transactions} />}
						className="row-flex ml-6 my-4 w-max filter transition duration-150 active:translate-y-0.5"
						fileName="transactions.pdf"
					>
						{({ loading }) => {
							return (
								<div className="row-flex gap-2.5 text-foreground-variant leading-4 font-semibold tracking-wide">
									<CloudDownload className="size-5 stroke-variant" />

									{loading ? "Generating..." : "	Download Transaction history"}
								</div>
							);
						}}
					</PDFDownloadLink>
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

export default Transactions;
