import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function DashboardLayout() {
  return (
    <>
      <div className="size-full bg-background overflow-x-hidden overflow-y-auto">
        <Outlet />

        <Footer />
      </div>
    </>
  );
}
