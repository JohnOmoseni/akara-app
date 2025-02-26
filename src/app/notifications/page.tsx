import { useGetAllNotificationsQuery } from "@/server/actions/notifications";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import useInfinitePagination from "@/hooks/useInfinitePagination";
import EmptyListWithIcon from "../_sections/empty-list";
import SectionWrapper from "@/layouts/SectionWrapper";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Notifications = () => {
	const { data, isLoading, isError, error } = useGetAllNotificationsQuery({});
	const { paginatedData, page, hasMore, loadMoreRef } =
		useInfinitePagination<any>(data);

	// Client-side pagination logic
	const paginatedNotifications: NotificationsType[] = useMemo(() => {
		const allNotifications = paginatedData.map((item: any) => {
			let message: any = "";

			if (item?.data) {
				try {
					const parsedData = JSON.parse(item.data);
					message = parsedData?.message || (
						<span className="italic">No description</span>
					);
				} catch (error) {
					message = <span className="italic">No description</span>;
					console.error("Invalid JSON:", item.data, error);
				}
			}

			return {
				id: item?.id,
				description: message,
				time: item?.created_at ? dayjs(item?.created_at).fromNow() : "",
				date: item?.created_at
					? dayjs(item?.created_at).format("D MMM, YYYY")
					: "",
			};
		});

		return allNotifications;
	}, [data, page]);

	useEffect(() => {
		// Request notification permission and register service worker
		const requestNotificationPermission = async () => {
			try {
				if ("Notification" in window) {
					const permission = await Notification.requestPermission();

					if (permission === "granted") {
						// Register service worker
						const registration = await navigator.serviceWorker.register(
							"/service-worker.js"
						);

						// Subscribe to push notifications
						// @ts-ignore
						const subscription = await registration.pushManager.subscribe({
							userVisibleOnly: true,
							applicationServerKey: "YOUR_PUBLIC_VAPID_KEY",
						});

						// Send subscription to your backend
						// await sendSubscriptionToServer(subscription);
					}
				}
			} catch (error) {
				console.error("Error setting up notifications:", error);
			}
		};

		requestNotificationPermission();
	}, []);

	useEffect(() => {
		if (isError)
			toast.warning((error as any)?.message || "Error fetching notifications");
	}, [isError, error]);

	return (
		<SectionWrapper mainContainerStyles="sm:pt-8">
			{isLoading ? (
				<div className="loader">
					<FallbackLoader loading />
				</div>
			) : paginatedNotifications?.length > 0 ? (
				<>
					<ul className="flex-column gap-5 max-w-3xl sm:px-3 mx-auto">
						{paginatedNotifications?.map((item) => {
							return (
								<li
									key={item.id}
									className="flex-column gap-1 pr-1 card !px-3 !py-3 drop-shadow-[0_1px_4px_rgb(0_0_0_/_0.08)]"
								>
									<p className="text-sm font-light break-before-auto">
										{item.description}
									</p>

									<p className="text-xs mt-1 text-grey row-flex-start gap-2 tracking-wide">
										<span className="size-2 bg-grey-100 rounded-full clip-circle" />
										<span>{item.time}</span>
									</p>
								</li>
							);
						})}
					</ul>

					<>
						{/* Load more trigger */}
						{hasMore && (
							<div ref={loadMoreRef} className="w-full py-4 flex row-flex">
								{hasMore && <Loader2 className="size-6 animate-spin" />}
							</div>
						)}

						{!hasMore && paginatedNotifications.length > 0 && (
							<p className="text-center text-grey italics my-4">
								No more notifications to load
							</p>
						)}
					</>
				</>
			) : (
				<EmptyListWithIcon title="No notifications yet!" />
			)}
		</SectionWrapper>
	);
};

export default Notifications;
