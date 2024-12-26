import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Header from "./Header";

type Props = {
  children: ReactNode;
  mainContainerStyles?: string;
  customHeaderComponent?: any;
};

const SectionWrapper = ({ children, mainContainerStyles, customHeaderComponent }: Props) => {
  return (
    <>
      <Header customHeaderComponent={customHeaderComponent} />

      <main
        className={cn(
          "w-full py-4 px-3 sm:py-6 min-h-dvh mb-[4rem] sm:mb-[4rem]",
          mainContainerStyles
        )}
      >
        {children}
      </main>
    </>
  );
};

export default SectionWrapper;
