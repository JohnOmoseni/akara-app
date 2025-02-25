import FallbackLoader from "@/components/fallback/FallbackLoader";
import EmptyListWithIcon from "../_sections/empty-list";
import SectionWrapper from "@/layouts/SectionWrapper";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useGetAllTransactionsQuery } from "@/server/actions/profile";
import { formatDate } from "@/lib";
import { MinusCircle, PlusCircle } from "@/constants/icons";

const AllTransactions = () => {
	const { data, isLoading, isError, error } = useGetAllTransactionsQuery({});

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

	useEffect(() => {
		if (isError)
			toast.warning((error as any)?.message || "Error fetching transactions");
	}, [isError, error]);

	if (isLoading) {
		return (
			<div className="loader">
				<FallbackLoader loading={isLoading} />
			</div>
		);
	}

	return (
		<SectionWrapper mainContainerStyles="sm:pt-8">
			{transactions?.length > 0 ? (
				<ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl sm:px-3 mx-auto">
					{transactions.map((tx: any) => {
						return (
							<li
								key={tx?.id}
								className="grid grid-cols-[max-content_1fr] gap-2 pr-1 card !px-3 !py-3 drop-shadow-[0_1px_4px_rgb(0_0_0_/_0.08)]"
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
			) : (
				<EmptyListWithIcon title="No transactions yet!" />
			)}
		</SectionWrapper>
	);
};

export default AllTransactions;
