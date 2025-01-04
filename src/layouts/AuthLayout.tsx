import { Logo } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="relative flex flex-col bg-background size-full overflow-x-hidden overflow-y-auto">
      <div
        className={cn(
          "relative flex-1 grid place-items-center flex-column gap-4 py-4 px-4 sm:py-8 sm:gap-6"
        )}
      >
        <div className="">
          <Logo className="h-fit w-fit object-contain" />
        </div>

        <div className="min-w-[280px] grid place-items-center size-full relative max-w-[420px] min-[450px]:w-full">
          <div className="flex-column gap-4 w-full">
            <Outlet />
          </div>
        </div>
      </div>

      <footer className="flex-column z-50 sm:row-flex-btwn mt-auto sticky bottom-0 w-full text-sm gap-x-4 gap-y-1 p-3 bg-background-100 border-t border-border-100 shadow-sm">
        <p className="text-center text-sm text-grey">
          &copy; {new Date().getFullYear()} Akara. All rights reserved.
        </p>

        <div className="row-flex gap-3 text-foreground-variant max-sm:text-xs">
          <Link to="/policy">Privacy Policy</Link>
          <Link to="/policy">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}
