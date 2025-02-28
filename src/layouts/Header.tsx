import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/types";
import { Logo, LogoMobile, Menu } from "@/constants/icons";
import { setOpenMenu, setSelectedTab } from "@/redux/features/appSlice";
import { useEffect } from "react";

interface HeaderProps {
	headerTitle?: string;
	customHeaderComponent?: React.ReactNode;
}

function Header({ headerTitle, customHeaderComponent }: HeaderProps) {
	const { selectedTab } = useAppSelector((state) => state.appState);
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const isPolicyPage = pathname === "/policy";
	const path = pathname.split("/")[1];

	useEffect(() => {
		dispatch(setSelectedTab(path === "" ? "dashboard" : path));
	}, []);

	return (
		<div className="sticky top-0 bg-background drop-shadow-[0_1px_8px_rgb(0_0_0_/_0.04)] z-[100] w-full">
			<div className="row-flex-btwn gap-6 py-1 sm:py-2 px-4 mx-auto md:w-[95%]">
				{!isPolicyPage && (
					<Menu
						className="w-fit h-6 sm:hidden cursor-pointer"
						onClick={() => dispatch(setOpenMenu(true))}
					/>
				)}

				<h3 className="font-semibold capitalize text-center">
					{headerTitle
						? headerTitle
						: selectedTab === "home"
						? "Dashboard"
						: selectedTab}
				</h3>

				{customHeaderComponent && (
					<div className="hidden md:block">
						{customHeaderComponent && customHeaderComponent}
					</div>
				)}

				<Link to="/" className="cursor-pointer">
					<Logo className="w-fit h-10 hidden sm:block" />
					<LogoMobile className="w-fit h-10 sm:hidden" />
				</Link>
			</div>
		</div>
	);
}

export default Header;
