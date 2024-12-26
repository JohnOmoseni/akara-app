import { useEffect } from "react";
import { toast } from "sonner";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import Main from "./Main";

function Home() {
  const isError = false;
  const error = null;
  const isFetching = false;

  useEffect(() => {
    if (isError) {
      const message = (error as any)?.message || (error as any)?.data?.message;
      toast.error(message || "Error fetching data");
    }
  }, [isError]);

  return (
    <>
      {isFetching ? (
        <div className="relative h-[50vh] max-h-[300px]">
          <FallbackLoader loading={isFetching} />
        </div>
      ) : (
        <Main />
      )}
    </>
  );
}

export default Home;
