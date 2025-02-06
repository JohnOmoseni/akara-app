import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import {
	ArrowDown,
	ArrowUp,
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
import { useGetAllOfferingsQuery } from "@/server/actions/offerings";
import { formatNumber } from "@/lib";
import { Modal } from "@/components/ui/components/Modal";
import { BuyOffering } from "./buy-modal";
import { ConfirmAction } from "../_sections/confirm-action";
import { Loader2 } from "lucide-react";

import SuccessModal from "../_sections/success-modal";
import Button from "@/components/reuseables/CustomButton";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import useInfinitePagination from "@/hooks/useInfinitePagination";
import EmptyListWithIcon from "../_sections/empty-list";

function Offerings() {
	const {
		data: offeringsData,
		isLoading,
		isError,
		error,
	} = useGetAllOfferingsQuery({});

	const [activeImageIndex, setActiveImageIndex] = useState(0);

	const { paginatedData, page, hasMore, loadMoreRef } =
		useInfinitePagination<any>(offeringsData);

	// Client-side pagination logic
	const offerings: ProcessedOffering[] = useMemo(() => {
		const allListings = (paginatedData || []).map((item: any) => ({
			name: item?.name || "",
			area: item?.location ? item?.location?.split("\n", 2)[1] : "",
			images: item?.images.map((img: any) => img?.image_path) || [
				"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
				"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
				"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
			],
			asideInfo: [
				{
					icon: Info,
					label: "Description",
					value: item?.description || "",
				},
				{
					icon: Location,
					label: "Location",
					value: item?.location ? `${item.location}` : "N/A",
				},
				{
					icon: Scale,
					label: "Valuation",
					value: formatNumber(item?.valuation) || "N/A",
				},
				{
					icon: Rental,
					label: "Net Annual Rental Income (Projection)",
					value:
						formatNumber(item?.projected_net_annual_rental_income) || "N/A",
				},
				{
					icon: LineChart,
					label: "Net Annual Appreciation (Projection)",
					value: formatNumber(item?.projected_annual_appreciation) || "N/A",
				},
				{
					icon: PieChart,
					label: "Co-ownership units available",
					value: item?.co_ownership_units || "N/A",
				},
				{
					icon: PriceTag,
					label: "Price per unit",
					value: formatNumber(item?.price_per_unit) || "N/A",
				},
				{
					icon: HouseKey,
					label: "Current Occupancy Status",
					value: item?.occupancy_stage || "N/A",
				},
			],
		}));

		return allListings;
	}, [paginatedData, page]);

	useEffect(() => {
		if (isError)
			toast.warning((error as any)?.message || "Error fetching offerings");
	}, [isError, error]);

	if (isLoading) {
		return (
			<div className="relative h-[50vh] max-h-[300px]">
				<FallbackLoader loading={isLoading} />
			</div>
		);
	}

	return (
		<div className="max-w-7xl relative flex-column gap-6 md:gap-7">
			{offerings?.length > 0 ? (
				<>
					{offerings.map((offering, idx) => (
						<div
							key={offering.name + idx}
							className="card w-full overflow-hidden grid grid-cols-1 sm:grid-cols-[60%_minmax(min-content,40%)] lg:grid-cols-[70%_minmax(min-content,30%)] !items-start gap-8 !p-1 sm:!p-3"
						>
							<section className="flex-column w-full gap-6">
								<div className="relative w-full h-[max(350px,40vh)] sm:h-[500px] rounded-md overflow-hidden">
									<img
										src={offering?.images?.[activeImageIndex]}
										alt=""
										className="w-full h-full object-cover transition-opacity duration-300 nodownload-image"
										style={{ opacity: 0.9 }}
										onContextMenu={(e) => e.preventDefault()}
										draggable="false"
										loading="lazy"
									/>

									<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 via-30% pointer-events-none" />

									<div className="absolute px-2.5 pb-3 sm:px-4 sm:pb-4 inset-0 top-auto row-flex-btwn gap-4 pointer-events-none">
										<div className="flex-column flex-1">
											<p className="text-white text-2xl sm:text-3xl capitalize">
												River Niger Apartment
											</p>
											<p className="text-white text-base sm:text-xl opacity-80">
												Yaba
											</p>
										</div>

										<div className="row-flex gap-2 self-end mb-2 max-w-[50%] overflow-x-auto remove-scrollbar">
											<div className="flex gap-2 px-2">
												{Array.from({ length: offering?.images?.length }).map(
													(_, index) => (
														<div
															key={index}
															ref={(el) => {
																if (el) {
																	// Store the element reference
																	const element = el;
																	// Use requestAnimationFrame to ensure DOM is ready
																	requestAnimationFrame(() => {
																		if (activeImageIndex === index) {
																			element.scrollIntoView({
																				behavior: "smooth",
																				block: "nearest",
																				inline: "nearest",
																			});
																		}
																	});
																}
															}}
															className={cn(
																"size-2 bg-white rounded-full transition-all duration-300",
																activeImageIndex === index &&
																	"bg-secondary scale-105"
															)}
														/>
													)
												)}
											</div>
										</div>
									</div>
								</div>

								<div className="grid grid-flow-col auto-cols-[7rem] h-20 md:h-28 gap-4 overflow-x-auto snap-x snap-mandatory remove-scrollbar [mask-image:linear-gradient(to_right,transparent,black_0%,black_100%,transparent)] px-[0.3rem]">
									{offering?.images?.map((img, index) => (
										<div
											key={index}
											className={cn(
												"relative cursor-pointer transition-opacity rounded-md overflow-hidden duration-200"
											)}
											onClick={() => setActiveImageIndex(index)}
										>
											<img
												src={img}
												alt={`Image ${index + 1}`}
												onContextMenu={(e) => e.preventDefault()}
												draggable="false"
												loading="lazy"
												className="size-full object-cover nodownload-image"
											/>

											{/* Invisible overlay for thumbnails */}
											<div
												className={cn(
													"absolute inset-0 bg-transparent/50  select-none",
													activeImageIndex === index && "opacity-30"
												)}
												onContextMenu={(e) => e.preventDefault()}
											/>
										</div>
									))}
								</div>
							</section>

							<aside className="w-full space-y-10 sticky sm:self-start my-2">
								<Aside info={offering?.asideInfo} offering={undefined} />
							</aside>
						</div>
					))}

					<>
						{/* Load more trigger */}
						{hasMore && (
							<div ref={loadMoreRef} className="w-full pb-4 flex row-flex">
								{hasMore && (
									<Loader2 className="size-6 animate-spin text-primary" />
								)}
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
const Aside = ({
	info,
	offering,
}: {
	info: AsideInfo[];
	offering?: Offering;
}) => {
	const [expanded, setExpanded] = useState(false);
	const { screenSize } = useAppSelector((state) => state.appState);
	const [openModal, setOpenModal] = useState<
		false | "pay" | "confirm" | "success"
	>(false);
	const [activeOffering, setActiveOffering] = useState<Offering | undefined>();

	return (
		<>
			<ul className="flex-column gap-4 w-full">
				{info
					?.slice(
						0,
						screenSize < 648 ? (expanded ? info.length : 3) : info?.length
					)
					.map((item: any, index: number) => (
						<li
							key={index}
							className="w-full grid grid-cols-[max-content_1fr] gap-2"
						>
							<item.icon className="size-4" />
							<p className="text-sm w-full pr-2">
								<span className="capitalize font-medium">{item?.label}: </span>

								<span className="text-foreground-100 leading-6 whitespace-pre-line">
									{item?.value}
								</span>
							</p>
						</li>
					))}

				{info?.length > 3 && screenSize < 648 && (
					<li
						onClick={() => setExpanded(!expanded)}
						className="text-sm block sm:hidden text-foreground-variant text-end w-max ml-auto font-medium transition-all duration-300"
					>
						{expanded ? (
							<>
								View Less <ArrowUp className="inline size-4" />
							</>
						) : (
							<>
								Expand <ArrowDown className="inline size-4" />
							</>
						)}
					</li>
				)}
			</ul>

			<div className="row-flex !flex-wrap gap-x-4 gap-y-2">
				<Button
					title="Download details"
					onClick={() => {}}
					className="w-full text-foreground-variant"
					variant={"outline"}
				/>

				<Button
					title="Buy"
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
							offering={activeOffering}
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
									You are about to purchase 5.6 co ownership units of{" "}
									<span className="font-semibold">
										River Niger Apartments, Yaba
									</span>{" "}
									for the sum of{" "}
									<span className="font-semibold"> ₦7,000,000</span>
								</>
							}
							action={() => setOpenModal("success")}
							actionText="Proceed"
						/>
					</Modal>
				)}

				{openModal && (
					<Modal openModal={openModal === "success"} isTopContent={<div />}>
						<SuccessModal
							onButtonClick={() => setOpenModal(false)}
							info={
								<>
									Congrats!!! You have successfully purchased 5.6 co ownership
									units of{" "}
									<span className="font-semibold">
										River Niger Apartments, Yaba
									</span>{" "}
									for <span className="font-semibold"> ₦7,000,000</span>.
									<br /> Your certificate of Beneficial Ownership has been sent
									to your registered email address <br />{" "}
									(Jamalnnamdi@gmail.com)
								</>
							}
							type="success"
						/>
					</Modal>
				)}
			</>
		</>
	);
};

export default Offerings;
