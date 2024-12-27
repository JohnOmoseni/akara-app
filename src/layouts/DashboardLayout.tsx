import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/types";
import { Outlet } from "react-router-dom";
import { Suspense, useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Menu from "./Menu";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import ScrollToTop from "./ScrollToTop";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const { openMenu } = useAppSelector((state) => state.appState);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const currentScrollY = scrollRef.current.scrollTop;

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
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isVisible, lastScrollY, scrollRef]);

  return (
    <>
      <ScrollToTop scrollRef={scrollRef} />
      <AnimatePresence mode="wait">{openMenu && <Menu />}</AnimatePresence>

      <div className="md:grid grid-cols-[80px_1fr] bg-background-100 overflow-hidden h-screen">
        <div className="overflow-x-hidden relative hidden overflow-y-auto md:block bg-background drop-shadow-[0_1px_8px_rgb(0_0_0_/_0.02)]">
          <Sidebar />
        </div>

        <div ref={scrollRef} className="size-full flex-1 overflow-x-hidden overflow-y-auto">
          <Suspense fallback={<FallbackLoader />}>
            <Outlet />
          </Suspense>
        </div>

        <Footer isVisible={isVisible} />
      </div>
    </>
  );
}
