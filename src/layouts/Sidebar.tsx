import { sidebarLinks } from "@/constants";
import { animateFn, linksAni } from "@/lib/animate";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SidebarLinksProp } from "../types";

function Sidebar() {
  return (
    <>
      <nav className="flex-column justify-center gap-10 px-6 mt-[max(5rem,env(safe-area-inset-top))] text-base">
        {sidebarLinks.map((link, idx) => (
          <NavLinks key={idx} {...link} idx={idx} />
        ))}
      </nav>
    </>
  );
}

export default Sidebar;

type NavLinkProps = SidebarLinksProp & {
  idx?: number;
};

function NavLinks({ href, icon: Icon, idx, tag }: NavLinkProps) {
  const { pathname } = useLocation();
  const isActive = pathname === href;
  const isLogOut = tag === "logout";

  return (
    <Link
      to={"/"}
      title={tag}
      {...animateFn(linksAni, idx)}
      className="row-flex p-1 transition-all group"
    >
      {Icon && (
        <Icon
          className={cn(
            "size-6 group-hover:stroke-variant",
            isActive && "",
            isLogOut && "!text-red-600"
          )}
        />
      )}
    </Link>
  );
}
