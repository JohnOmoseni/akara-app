import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Info, Location, PieChart, Rental, Scale } from "@/constants/icons";
import { formatNumber, truncateText } from "@/lib";
import { Loader2 } from "lucide-react";

import useInfinitePagination from "@/hooks/useInfinitePagination";
import EmptyListWithIcon from "../_sections/empty-list";

function Earnings({ earningsData }: { earningsData: any }) {
	const [activeImage, setActiveImage] = useState({
		activeItem: 0,
		activeImageIndex: 0,
	});

	const { paginatedData, page, hasMore, loadMoreRef } =
		useInfinitePagination<any>(earningsData);

	// Client-side pagination logic
	const earnings: ProcessedOffering[] = useMemo(() => {
		const allListings = paginatedData.map((item: any) => {
			const offering = item?.offering;

			return {
				id: offering?.id,
				name: offering?.name || "",
				area: offering?.location ? offering?.location?.split("\n", 2)[1] : "",
				// images: offering?.image?.map((img: any) => img?.image_path) || [],
				images: [
					"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
					"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
					"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
				],
				asideInfo: [
					{
						icon: Info,
						label: "Description",
						value: offering?.description || "",
					},
					{
						icon: Location,
						label: "Location",
						value: offering?.location ? `${offering.location}` : "",
					},
					{
						icon: Scale,
						label: "Valuation",
						value: formatNumber(offering?.valuation) || "N/A",
					},
					{
						icon: PieChart,
						label: "Co-ownership units owned",
						value: offering?.units || "N/A",
					},
					{
						icon: Rental,
						label: "Rent Income Earned",
						value: formatNumber(item?.amount) || "N/A",
					},
				],
			};
		});

		return allListings;
	}, [paginatedData, page]);

	return (
		<div className="max-w-7xl relative flex-column gap-6 md:gap-7">
			{earnings?.length > 0 ? (
				<>
					{earnings.map((earning, idx) => (
						<div
							key={earning.name + idx}
							className="card w-full overflow-hidden grid grid-cols-1 sm:grid-cols-[60%_minmax(min-content,40%)] lg:grid-cols-[70%_minmax(min-content,30%)] !items-start gap-8 !p-1 sm:!p-3"
						>
							<section className="flex-column w-full gap-6">
								<div className="relative w-full h-[max(350px,40vh)] sm:h-[500px] rounded-md overflow-hidden">
									<img
										src={
											activeImage.activeImageIndex === idx
												? earning?.images[activeImage.activeItem]
												: earning?.images[0]
										}
										alt=""
										className="w-full h-full object-cover transition-opacity duration-300 nodownload-image"
										style={{ opacity: 0.9 }}
										onContextMenu={(e) => e.preventDefault()}
										draggable="false"
										loading="lazy"
									/>

									<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 via-30% pointer-events-none" />

									<div className="absolute px-2.5 pb-3 sm:px-5 sm:pb-5 inset-0 top-auto row-flex-btwn gap-4">
										<div className="flex-column flex-1 gap-1 pointer-events-none">
											<p className="text-white text-2xl sm:text-3xl capitalize">
												{truncateText(earning.name)}
											</p>
											<p className="text-white text-base sm:text-xl opacity-80">
												{truncateText(earning.area)}
											</p>
										</div>

										<div className="row-flex gap-2 self-end mb-2 max-w-[50%] overflow-x-auto remove-scrollbar">
											<div className="flex gap-2 px-2">
												{Array.from({ length: earning?.images?.length }).map(
													(_, index) => (
														<div
															key={index}
															ref={(el) => {
																if (el) {
																	// Store the element reference
																	// const element = el;
																	// Use requestAnimationFrame to ensure DOM is ready
																	// requestAnimationFrame(() => {
																	// 	if (activeImageIndex === index) {
																	// 		element.scrollIntoView({
																	// 			behavior: "smooth",
																	// 			block: "nearest",
																	// 			inline: "nearest",
																	// 		});
																	// 	}
																	// });
																}
															}}
															className={cn(
																"size-2 lg:size-2.5 bg-white rounded-full transition-all duration-300 shadow-sm",
																(activeImage?.activeItem === index &&
																	activeImage?.activeImageIndex === idx) ||
																	(index === 0 &&
																		activeImage?.activeImageIndex !== idx)
																	? "bg-secondary scale-105"
																	: ""
															)}
															onClick={() => {
																setActiveImage((prev) => ({
																	...prev,
																	activeItem: index,
																	activeImageIndex: idx,
																}));
															}}
														/>
													)
												)}
											</div>
										</div>
									</div>
								</div>

								{earning?.images?.length > 0 && (
									<div className="grid grid-flow-col auto-cols-[7rem] h-20 md:h-28 gap-4 overflow-x-auto snap-x snap-mandatory remove-scrollbar [mask-image:linear-gradient(to_right,transparent,black_0%,black_100%,transparent)] transition-all px-[0.3rem]">
										{earning.images.map((img, index) => {
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
															"absolute inset-0 bg-transparent/50 transition select-none",
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
								<Aside info={earning?.asideInfo} />
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

						{!hasMore && earnings?.length > 0 && (
							<p className="text-center text-grey italics pb-4">
								No more earnings to load
							</p>
						)}
					</>
				</>
			) : (
				<EmptyListWithIcon title="No earnings yet!" />
			)}
		</div>
	);
}

// Separate the Aside component into its own file
const Aside = ({ info }: { info: AsideInfo[]; earning?: Earning }) => {
	return (
		<>
			<ul className="flex-column gap-4 w-full">
				{info?.map((item: any, index: number) => (
					<li
						key={index}
						className="w-full grid grid-cols-[max-content_1fr] gap-2"
					>
						<item.icon className="size-4 mt-[3px]" />

						<p className={cn("text-sm w-full pr-2")}>
							<span className="capitalize font-medium">{item?.label}: </span>

							<span
								className={cn(
									"text-foreground-100 leading-6 whitespace-pre-line",
									item?.label === "Rent Income Earned" &&
										"text-secondary-100 font-medium"
								)}
							>
								{item?.value}
							</span>
						</p>
					</li>
				))}
			</ul>
		</>
	);
};

export default Earnings;
