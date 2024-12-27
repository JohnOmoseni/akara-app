import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/types";
import { Outlet } from "react-router-dom";
import { Suspense, useRef } from "react";
import Footer from "./Footer";
import Menu from "./Menu";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import ScrollToTop from "./ScrollToTop";

export default function DashboardLayout() {
  const { openMenu } = useAppSelector((state) => state.appState);
  const scrollRef = useRef(null);

  console.log("OPEN_MENU", openMenu);

  return (
    <>
      <ScrollToTop scrollRef={scrollRef} />
      <AnimatePresence mode="wait">{openMenu && <Menu />}</AnimatePresence>

      <div ref={scrollRef} className="size-full bg-background overflow-x-hidden overflow-y-auto">
        <Suspense fallback={<FallbackLoader />}>
          <Outlet />
        </Suspense>

        <Footer />
      </div>
    </>
  );
}
