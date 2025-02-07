import FallbackLoader from "@/components/fallback/FallbackLoader";
import useInfinitePagination from "@/hooks/useInfinitePagination";
import EmptyListWithIcon from "../_sections/empty-list";
import SectionWrapper from "@/layouts/SectionWrapper";
import { useGetAllNotificationsQuery } from "@/server/actions/notifications";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

const Notifications = () => {
	const { data, isLoading, isError, error } = useGetAllNotificationsQuery({});
	const { paginatedData, page, hasMore, loadMoreRef } =
		useInfinitePagination<any>(data?.notifications);

	// Client-side pagination logic
	const paginatedNotifications: NotificationsType[] = useMemo(() => {
		const allNotifications = (paginatedData || []).map((item: any) => ({
			description: item?.name || "",
			time: "",
			date: "",
		}));

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
			toast.warning((error as any)?.message || "Error fetching offerings");
	}, [isError, error]);

	return (
		<SectionWrapper mainContainerStyles="sm:pt-8">
			{isLoading ? (
				<div className="loader">
					<FallbackLoader />
				</div>
			) : paginatedNotifications?.length > 0 ? (
				<ul className="flex-column gap-5 max-w-4xl sm:px-3 mx-auto">
					<>
						{paginatedNotifications?.map((_, idx) => {
							return (
								<li
									key={idx}
									className="flex-column gap-1 pr-1 card !px-3 !py-3 drop-shadow-[0_1px_4px_rgb(0_0_0_/_0.08)]"
								>
									<p className="text-sm font-light break-all">
										You have successfully funded your wallet with ₦50,000. Your
										current wallet balance is ₦5,000
									</p>

									<p className="text-xs mt-1 text-grey row-flex-start gap-2 tracking-wide">
										<span className="size-2 bg-grey-100 rounded-full clip-circle" />
										<span>4mins ago</span>
									</p>
								</li>
							);
						})}

						<>
							{/* Load more trigger */}
							{hasMore && (
								<div ref={loadMoreRef} className="w-full pb-4 flex row-flex">
									{hasMore && <FallbackLoader loading={true} />}
								</div>
							)}

							{!hasMore && paginatedNotifications.length > 0 && (
								<p className="text-center text-grey italics pb-4">
									No more offerings to load
								</p>
							)}
						</>
					</>
				</ul>
			) : (
				<EmptyListWithIcon title="No notifications yet!" />
			)}
		</SectionWrapper>
	);
};

export default Notifications;
