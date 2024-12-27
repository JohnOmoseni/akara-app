import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/types";
import { Outlet } from "react-router-dom";
import { Suspense, useRef } from "react";
import Footer from "./Footer";
import Menu from "./Menu";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import ScrollToTop from "./ScrollToTop";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const { openMenu } = useAppSelector((state) => state.appState);
  const scrollRef = useRef(null);

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

        <Footer />
      </div>
    </>
  );
}
