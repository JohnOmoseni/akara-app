import { ArrowLeft, ArrowRight } from "@/constants/icons";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";

type Props = {
  currentPage: number;
  pageCount: number;
  setItemOffset: Dispatch<SetStateAction<number>>;
};

function Pagination({ currentPage, pageCount, setItemOffset }: Props) {
  return (
    <div className="row-flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setItemOffset((prev) => Math.max(0, prev - 1))}
        disabled={currentPage === 1}
        className="group !p-1.5 disabled:cursor-pointer"
      >
        <ArrowLeft size={20} className="group-disabled:text-grey" />
      </Button>

      <p className="text-base whitespace-nowrap">
        {currentPage} of {pageCount}
      </p>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setItemOffset((prev) => prev + 1)}
        disabled={currentPage === pageCount}
        className="group !p-1.5 disabled:cursor-pointer"
      >
        <ArrowRight size={20} className="group-disabled:text-grey" />
      </Button>
    </div>
  );
}

export default Pagination;
