import { Link } from "react-router-dom";
import { useAppSelector } from "@/types";
import { Logo, LogoMobile, Menu } from "@/constants/icons";

interface HeaderProps {
  customHeaderComponent?: React.ReactNode;
}

function Header({ customHeaderComponent }: HeaderProps) {
  const { selectedTab } = useAppSelector((state) => state.appState);

  return (
    <div className="sticky top-0 bg-background drop-shadow-[0_1px_8px_rgb(0_0_0_/_0.08)] z-[100] w-full">
      <div className="row-flex-btwn gap-6 py-2 px-4 mx-auto md:w-[90%]">
        <Menu className="w-fit h-6 sm:hidden" />

        <h3 className="font-semibold capitalize">
          {selectedTab === "home" ? "Dashboard" : selectedTab}
        </h3>

        <div className="hidden md:block">{customHeaderComponent && customHeaderComponent}</div>

        <Link to="/" className="">
          <Logo className="w-fit h-10 hidden sm:block" />
          <LogoMobile className="w-fit h-10 sm:hidden" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
