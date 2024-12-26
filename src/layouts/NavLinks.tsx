import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { setOpenMenu } from "@/redux/features/appSlice";
import { animateFn, linksAni } from "@/lib/animate";
import { SidebarLinksProp, useAppDispatch, useAppSelector } from "@/types";
import { Link, useLocation } from "react-router-dom";

export type NavLinkProps = SidebarLinksProp & {
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

export default NavLinks;
