import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
	ArrowDown,
	ArrowUp,
	BuyIcon,
	Download,
	HouseKey,
	Info,
	LineChart,
	Location,
	PieChart,
	PriceTag,
	Rental,
	Scale,
} from "@/constants/icons";
import { useAppSelector } from "@/types";
import { formatNumber, truncateText } from "@/lib";
import { Modal } from "@/components/ui/components/Modal";
import { BuyOffering } from "./buy-modal";
import { ConfirmAction } from "../_sections/confirm-action";
import { Loader2 } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useBuyOfferingMutation } from "@/server/actions/transactions";
import { useAuth } from "@/context/AuthContext";

import StatusModal from "../_sections/status-modal";
import Button from "@/components/reuseables/CustomButton";
import useInfinitePagination from "@/hooks/useInfinitePagination";
import EmptyListWithIcon from "../_sections/empty-list";
import OfferingDocument from "./OfferingDocument";
// import ShareButton from "@/components/reuseables/ShareButton";

function Offerings({ offeringsData }: { offeringsData: any }) {
	const [activeImage, setActiveImage] = useState({
		activeItem: 0,
		activeImageIndex: 0,
	});

	const { paginatedData, page, hasMore, loadMoreRef } =
		useInfinitePagination<any>(offeringsData);

	// Client-side pagination logic
	const offerings: ProcessedOffering[] = useMemo(() => {
		const allListings = paginatedData.map((item: any) => ({
			id: item?.id,
			name: item?.name || "",
			area: item?.location ? item?.location?.split("\n", 2)[1] : "",
			images: item?.image?.map((img: any) => img?.image_path) || [],
			asideInfo: [
				{
					icon: Info,
					label: "Description",
					value: item?.description || "",
					tag: "description",
				},
				{
					icon: Location,
					label: "Location",
					value: item?.location ? `${item.location}` : "N/A",
					tag: "location",
				},
				{
					icon: Scale,
					label: "Valuation",
					value: formatNumber(item?.valuation) || "N/A",
					tag: "valuation",
				},
				{
					icon: Rental,
					label: "Net Annual Rental Income (Projection)",
					value:
						formatNumber(item?.projected_net_annual_rental_income) || "N/A",
					tag: "annual_rental_income",
				},
				{
					icon: LineChart,
					label: "Net Annual Appreciation (Projection)",
					value: formatNumber(item?.projected_annual_appreciation) || "N/A",
					tag: "annual_appreciation",
				},
				{
					icon: PieChart,
					label: "Co-ownership units available",
					value: item?.units || "N/A",
					tag: "co_ownership_units",
				},
				{
					icon: PriceTag,
					label: "Price per unit",
					value: formatNumber(item?.price_per_unit) || "N/A",
					tag: "price_per_unit",
				},
				{
					icon: HouseKey,
					label: "Current Occupancy Status",
					value: item?.occupancy_stage || "N/A",
					tag: "occupancy_status",
				},
			],
		}));

		return allListings;
	}, [paginatedData, page]);

	return (
		<div className="max-w-7xl relative flex-column gap-6 md:gap-7">
			{offerings?.length > 0 ? (
				<>
					{offerings.map((offering, idx) => (
						<div
							key={offering.name + idx}
							className="card w-full overflow-hidden grid grid-cols-1 sm:grid-cols-[60%_minmax(min-content,40%)] lg:grid-cols-[65%_minmax(min-content,35%)] !items-start gap-8 !p-1 sm:!p-3"
						>
							<section className="flex-column w-full gap-6">
								<div className="relative w-full h-[max(350px,40vh)] sm:h-[500px] rounded-md overflow-hidden">
									<img
										src={
											activeImage.activeImageIndex === idx
												? offering?.images[activeImage.activeItem]
												: offering?.images[0]
										}
										alt=""
										className="w-full h-full object-cover transition-opacity duration-300 nodownload-image"
										style={{ opacity: 0.9 }}
										onContextMenu={(e) => e.preventDefault()}
										draggable="false"
										loading="lazy"
									/>

									<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 via-30% pointer-events-none" />

									<div className="absolute px-2.5 pb-3 sm:px-5 sm:pb-5 inset-0 top-auto row-flex-btwn gap-4 pointer-events-none">
										<div className="flex-column flex-1 gap-1">
											<p className="text-white text-2xl sm:text-3xl capitalize">
												{truncateText(offering.name)}
											</p>
											<p className="text-white text-base sm:text-xl opacity-80">
												{truncateText(offering.area)}
											</p>
										</div>

										<div className="row-flex gap-2 self-end mb-2 max-w-[50%] overflow-x-auto remove-scrollbar">
											<div className="flex gap-2 px-2">
												{Array.from({ length: offering?.images?.length }).map(
													(_, index) => (
														<div
															key={index}
															className={cn(
																"size-2 bg-white rounded-full transition-all duration-300",
																(activeImage?.activeItem === index &&
																	activeImage?.activeImageIndex === idx) ||
																	(index === 0 &&
																		activeImage?.activeImageIndex !== idx)
																	? "bg-secondary scale-105"
																	: ""
															)}
														/>
													)
												)}
											</div>
										</div>
									</div>
								</div>

								{offering?.images?.length > 0 && (
									<div className="grid grid-flow-col auto-cols-[7rem] h-20 md:h-28 gap-4 overflow-x-auto snap-x snap-mandatory remove-scrollbar [mask-image:linear-gradient(to_right,transparent,black_0%,black_100%,transparent)] px-[0.3rem]">
										{offering.images.map((img, index) => {
											const isActive =
												(activeImage?.activeItem === index &&
													activeImage?.activeImageIndex === idx) ||
												(index === 0 && activeImage?.activeImageIndex !== idx);

											return (
												<div
													key={index}
													className={cn(
														"relative cursor-pointer transition-opacity rounded-md overflow-hidden duration-200"
													)}
													onClick={() =>
														setActiveImage((prev) => ({
															...prev,
															activeItem: index,
															activeImageIndex: idx,
														}))
													}
												>
													<img
														src={img}
														alt={`Image ${index + 1}`}
														onContextMenu={(e) => e.preventDefault()}
														draggable="false"
														loading="lazy"
														className="size-full object-cover nodownload-image"
													/>

													<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 via-30% pointer-events-none" />

													{/* Invisible overlay for thumbnails */}
													<div
														className={cn(
															"absolute inset-0 bg-transparent/50  select-none",
															isActive && "opacity-10"
														)}
														onContextMenu={(e) => e.preventDefault()}
													/>
												</div>
											);
										})}
									</div>
								)}
							</section>

							<aside className="w-full space-y-10 sticky sm:self-start my-2">
								<Aside info={offering?.asideInfo} offering={offering} />
							</aside>
						</div>
					))}

					<>
						{/* Load more trigger */}
						{hasMore && (
							<div ref={loadMoreRef} className="w-full pb-4 flex row-flex">
								{hasMore && <Loader2 className="size-6 animate-spin" />}
							</div>
						)}

						{!hasMore && offerings?.length > 0 && (
							<p className="text-center text-grey italics pb-4">
								No more offerings to load
							</p>
						)}
					</>
				</>
			) : (
				<EmptyListWithIcon title="No listed offerings yet!" />
			)}
		</div>
	);
}

// Separate the Aside component into its own file
const Aside = ({ info, offering }: { info: AsideInfo[]; offering?: any }) => {
	const { user } = useAuth();

	const [expanded, setExpanded] = useState(false);
	const { screenSize } = useAppSelector((state) => state.appState);
	const [openModal, setOpenModal] = useState<
		false | "pay" | "confirm" | "success" | "error"
	>(false);
	const [error, setError] = useState("");
	const [activeOffering, setActiveOffering] = useState<ActiveOffering | null>(
		null
	);
	const [buyOfferingMutation, { isLoading }] = useBuyOfferingMutation();

	const handlePurchaseOffering = async () => {
		if (activeOffering === null) return;

		const data = {
			offering_id: activeOffering.id,
			number_of_units: activeOffering.number_of_units,
			total_amount_worth: activeOffering.total_amount_worth,
		};
		let message;

		setError("");

		try {
			const res = await buyOfferingMutation(data);

			if (res.error) {
				message = (res.error as any)?.data?.error || "An error occured";
				throw new Error(message);
			}

			message = res?.data?.message || "Buy Request Successful";
			setOpenModal("success");
		} catch (error: any) {
			const message = error?.message || "An error occured";

			setOpenModal("error");
			setError(message);
		}
	};

	// @ts-ignore
	const downloadCSV = (data: any, filename?: string) => {
		const headers = [
			"offering_name",
			"offering_description",
			"offering_location",
			"offering_valuation",
			"offering_rental_income",
			"offering_annual_appreciation",
			"offering_co-ownership_unit",
			"offering_price_per_unit",
			"offering_occupancy_status",
		];

		try {
			const csvRows = [headers.join(",")];

			const row = [
				data.name,
				...data?.asideInfo?.map((item: any) => item?.value),
			];
			console.log("TEST", data, row);
			csvRows.push(row.join(","));

			const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
			const url = URL.createObjectURL(blob);

			const a = document.createElement("a");
			a.href = url;
			a.download =
				filename || `${data?.name ? `${data?.name}-data` : "data"}.csv`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (error) {
			console.log("Error downloading CSV:", error);
		}
	};

	return (
		<>
			<ul className="flex-column gap-4 w-full">
				{info
					?.slice(
						0,
						screenSize < 640 ? (expanded ? info.length : 3) : info?.length
					)
					.map((item: any, index: number) => (
						<li
							key={index}
							className="w-full grid grid-cols-[max-content_1fr] gap-2"
						>
							<item.icon className="size-4 mt-[3px]" />
							<p className="text-sm w-full pr-2">
								<span className="capitalize font-medium">{item?.label}: </span>

								<span className="text-foreground-100 leading-6 whitespace-pre-line">
									{item?.value}
								</span>
							</p>
						</li>
					))}

				{info?.length > 3 && screenSize < 640 && (
					<li
						onClick={() => setExpanded(!expanded)}
						className="text-sm block sm:hidden text-foreground-variant text-end w-max ml-auto font-medium transition-all duration-300 cursor-pointer"
					>
						{expanded ? (
							<>
								View Less <ArrowUp className="inline size-4 -mt-0.5" />
							</>
						) : (
							<>
								Expand <ArrowDown className="inline size-4 -mt-0.5" />
							</>
						)}
					</li>
				)}
			</ul>

			<div className="flex-column gap-x-4 gap-y-2">
				{/* <div className="row-flex-btwn gap-3"> */}
					<PDFDownloadLink
						document={<OfferingDocument offering={offering} />}
						className="w-full flex-1 download-button border row-flex border-border-100 py-2.5 rounded-md shadow-sm filter transition duration-150 active:translate-y-0.5 active:brightness-90"
						fileName="earnings_report.pdf"
					>
						{({ loading }) => {
							return (
								<div className="row-flex gap-1 text-foreground leading-4 font-semibold">
									<Download className="size-6 stroke-variant -mt-1" />

									{loading ? "Generating PDF..." : "	Download PDF"}
								</div>
							);
						}}
					</PDFDownloadLink>

					{/* <ShareButton offering={offering} /> */}
				{/* </div> */}

				<Button
					title="Buy"
					icon={BuyIcon}
					iconStyles="stroke-white"
					onClick={() => {
						setActiveOffering(offering);
						setOpenModal("pay");
					}}
					className="w-full"
				/>
			</div>

			<>
				{openModal && (
					<Modal
						openModal={openModal === "pay"}
						isTopContent={<div />}
						setOpenModal={() => setOpenModal(false)}
					>
						<BuyOffering
							closeModal={() => setOpenModal(false)}
							setOpenModal={setOpenModal}
							offering={activeOffering!}
							setActiveOffering={setActiveOffering}
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
									You are about to purchase{" "}
									{activeOffering?.number_of_units || "-"} co-ownership units of{" "}
									<span className="font-semibold">
										{activeOffering?.area || "N/A"}
									</span>{" "}
									for the sum of{" "}
									<span className="font-semibold">
										{" "}
										₦
										{activeOffering?.total_amount_worth
											? formatNumber(activeOffering?.total_amount_worth)
											: "N/A"}
									</span>
								</>
							}
							action={() => handlePurchaseOffering()}
							actionText={isLoading ? "Processing..." : "Proceed"}
							isLoading={isLoading}
						/>
					</Modal>
				)}

				{openModal && (
					<Modal openModal={openModal === "success"} isTopContent={<div />}>
						<StatusModal
							closeModal={() => setOpenModal(false)}
							info={
								<>
									Congrats!!! You have successfully purchased{" "}
									{activeOffering?.number_of_units} co ownership units of{" "}
									<span className="font-semibold">{activeOffering?.area}</span>{" "}
									for{" "}
									<span className="font-semibold">
										{" "}
										₦{activeOffering?.total_amount_worth}
									</span>
									.
									<br /> Your certificate of Beneficial Ownership will be sent
									to your registered email address <br /> ({user?.email})
								</>
							}
							type="success"
						/>
					</Modal>
				)}

				{openModal && (
					<Modal openModal={openModal === "error"} isTopContent={<div />}>
						<StatusModal
							closeModal={() => setOpenModal(false)}
							info={
								<>
									Oops! Something went wrong while processing your purchase of{" "}
									{activeOffering?.number_of_units} co-ownership units of{" "}
									<span className="font-semibold">{activeOffering?.area}</span>{" "}
									for{" "}
									<span className="font-semibold">
										₦{activeOffering?.total_amount_worth}
									</span>
									.
									<br />
									<br />
									{error ? error : "Please check your details and try again."}
								</>
							}
							type="error"
						/>
					</Modal>
				)}
			</>
		</>
	);
};

export default Offerings;
