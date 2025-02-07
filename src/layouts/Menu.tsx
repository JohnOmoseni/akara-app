import { motion } from "framer-motion";
import { sidebarLinks } from "@/constants";
import { Close } from "@/constants/icons";
import {
	animateFn,
	animateMenu,
	linksAni,
	slideinVariant,
} from "@/lib/animate";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { setOpenMenu } from "@/redux/features/appSlice";
import { useAppDispatch, useAppSelector } from "@/types";
import { SidebarLinksProp } from "../types";

function Menu() {
	const dispatch = useAppDispatch();

	return (
		<motion.div
			style={{ zIndex: 9999 }}
			className="fixed inset-0 block h-dvh w-full overflow-hidden bg-black/30 backdrop-blur-sm md:hidden"
			{...animateFn(animateMenu)}
			onClick={() => dispatch(setOpenMenu(false))}
		>
			<motion.div
				{...animateFn(slideinVariant)}
				className="menu remove-scrollbar flex-column absolute left-0 top-0 isolate h-full w-[85%] max-w-[500px] overflow-hidden bg-background px-1.5 pr-2 pb-6 pt-[max(4.5rem,_12vh)] backdrop-blur-sm"
				onClick={(e) => e.stopPropagation()}
			>
				<span
					className="icon absolute right-4 top-4 p-1 transition-colors active:scale-95"
					onClick={() => dispatch(setOpenMenu(false))}
					title="close-menu"
				>
					<Close className="z-[50] cursor-pointer text-foreground size-7" />
				</span>

				<ul className="flex-column size-full gap-6 text-base">
					{sidebarLinks.map((link, idx) => (
						<NavLinks key={idx} {...link} idx={idx} />
					))}
				</ul>
			</motion.div>
		</motion.div>
	);
}

export default Menu;

type NavLinkProps = SidebarLinksProp & {
	idx?: number;
};

function NavLinks({ label, href, icon: Icon, idx, tag }: NavLinkProps) {
	const { pathname } = useLocation();
	const isActive = pathname === href;
	const isLogOut = tag === "logout";

	const { openMenu } = useAppSelector((state) => state.appState);
	const dispatch = useAppDispatch();

	const handleClick = () => {
		if (openMenu) dispatch(setOpenMenu(false));
	};

	return (
		<li className="relative w-full">
			<Link
				to={"/"}
				{...animateFn(linksAni, idx)}
				onClick={() => handleClick()}
				className={cn(
					"row-flex-start gap-3 py-3.5 px-5 transition-all rounded"
				)}
			>
				{Icon && <Icon className={cn("size-5", isActive && "")} />}

				<motion.span
					className={cn(
						"capitalize leading-4 mt-px",
						isActive && "font-medium text-foreground-variant",
						isLogOut && "text-red-600"
					)}
				>
					{label}
				</motion.span>
			</Link>
		</li>
	);
}
