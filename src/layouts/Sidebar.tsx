import { motion } from "framer-motion";
import { sidebarLinks } from "@/constants";
import { Close } from "@/constants/icons";
import { animateFn, linksAni, revealMenu, slideinVariant } from "@/lib/animate";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { setOpenMenu } from "@/redux/features/appSlice";
import { useAppDispatch, useAppSelector } from "@/types";
import { SidebarLinksProp } from "../types";

function Sidebar() {
  return (
    <motion.div
      style={{ zIndex: 9999 }}
      className="fixed inset-0 block h-dvh w-full overflow-hidden bg-black/30 backdrop-blur-sm md:hidden"
      {...animateFn(revealMenu)}
      onClick={() => setOpenMenu(false)}
    >
      <motion.div
        {...animateFn(slideinVariant)}
        className="menu remove-scrollbar flex-column absolute left-0 top-0 isolate h-full w-[80%] max-w-[500px] overflow-hidden bg-background px-[4%] pb-6 pt-[4%] backdrop-blur-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="icon absolute right-4 top-4 p-1 transition-colors active:scale-95"
          onClick={() => setOpenMenu(false)}
          title="close-menu"
        >
          <Close size="22" className="z-100 cursor-pointer text-foreground" />
        </span>

        <div className="flex-column size-full gap-6">
          <nav className="flex-column size-full flex-1 !justify-center gap-8 px-6 pt-[10%] text-xl">
            {sidebarLinks.map((link, idx) => (
              <NavLinks key={idx} {...link} idx={idx} />
            ))}
          </nav>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Sidebar;

type NavLinkProps = SidebarLinksProp & {
  idx?: number;
};

function NavLinks({ label, href, icon: Icon, idx }: NavLinkProps) {
  const { pathname } = useLocation();
  const isActive = pathname === href;

  const { openMenu } = useAppSelector((state) => state.appState);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (openMenu) dispatch(setOpenMenu(false));
  };

  return (
    <li className="nav-link relative w-full">
      <Link
        to={href}
        {...animateFn(linksAni, idx)}
        onClick={() => handleClick()}
        className="row-flex-start gap-3 p-1 transition-all"
      >
        {Icon && <Icon className={cn("size-5", isActive && "size-5")} />}

        <motion.span
          className={cn(
            "tracking-snug mt-0.5 text-base font-semibold capitalize",
            isActive && "text-foreground-variant"
          )}
        >
          {label}
        </motion.span>
      </Link>
    </li>
  );
}
