import { useAppDispatch } from "@/types";
import { Suspense, useEffect } from "react";
import { setNetwork, setScreenSize } from "@/redux/features/appSlice";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import FallbackLoader from "@/components/fallback/FallbackLoader";

function LayoutProvider() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const updateNetwork = () => {
			dispatch(setNetwork(navigator.onLine));
		};
		const getScreenSize = () => {
			dispatch(setScreenSize(window?.innerWidth));
		};

		getScreenSize();
		updateNetwork();

		window.addEventListener("resize", getScreenSize);
		window.addEventListener("online", updateNetwork);
		window.addEventListener("offline", updateNetwork);

		return () => {
			window.removeEventListener("resize", getScreenSize);
			window.removeEventListener("online", updateNetwork);
			window.removeEventListener("offline", updateNetwork);
		};
	}, []);

	return (
		<>
			<div className="wrapper font-inter">
				<Suspense fallback={<FallbackLoader />}>
					<Outlet />
				</Suspense>
			</div>
			<Toaster
				richColors
				toastOptions={{
					style: { padding: "1.1rem" },
					className: "my-toast",
				}}
			/>
		</>
	);
}
export default LayoutProvider;
