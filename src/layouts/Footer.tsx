import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/types";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { footerTabs } from "@/constants";
import { setSelectedTab } from "@/redux/features/appSlice";

const Footer = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const selectedTab = pathname.split("/")[1];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <footer
      className={cn(
        "bg-background w-full mx-auto z-[200] border fixed sm:bottom-3 inset-0 top-auto sm:max-w-[350px] sm:rounded-lg sm:drop-shadow-[0_1px_4px_rgb(0_0_0_/_0.08)] max-sm:border-t border-border-100",
        "transition-transform duration-300",
        !isVisible && "max-sm:translate-y-full"
      )}
    >
      <div className="flex flex-row justify-around gap-4 px-4 pt-0.5 max-sm:max-h-[60px] min-h-14">
        {footerTabs.map(({ icon: Icon, label, href, value }, index) => (
          <div
            className={cn(
              "relative px-4 py-2 sm:py-3.5 flex-column items-center",
              selectedTab === value
                ? "text-secondary bg-yellow-100"
                : "cursor-pointer -mt-2 sm:-mt-4 justify-center"
            )}
            onClick={() => {
              dispatch(setSelectedTab(value));
              navigate(href);
            }}
            key={index}
          >
            {Icon && (
              <Icon
                className={cn(
                  "size-5 sm:size-6 text-grey mx-auto",
                  selectedTab === value && "size-5 text-secondary"
                )}
              />
            )}

            {selectedTab.includes(value) && (
              <p className="font-semibold capitalize text-xs text-secondary-variant mt-1">
                {label}
              </p>
            )}

            {selectedTab.includes(value) && (
              <div className="absolute inset-0 bottom-auto w-full mx-auto h-[3px] rounded-full bg-secondary" />
            )}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
