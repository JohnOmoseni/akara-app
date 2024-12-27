import { NoSearch, Plus } from "@/constants/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Button from "@/components/reuseables/CustomButton";
import SectionWrapper from "@/layouts/SectionWrapper";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import Offerings from "./Offerings";

function Main() {
  // const {
  //   data: offerings,
  //   isFetching: isLoading,
  //   isError: isHotelsError,
  //   error: hotelsError,
  // } = useGetAllHotelsQuery({});

  // const {
  //   data: earnings,
  //   isError: isBookingsError,
  //   isFetching: isBookingsFetching,
  //   error: bookingsError,
  // } = useGetAllBookingsQuery({});

  const isLoading = false;

  const { state } = useLocation();
  const { type } = state || { type: "offerings" };

  // useEffect(() => {
  //   if (isHotelsError) {
  //     const message = (hotelsError as any)?.message;
  //     toast.error(message || "Error fetching offerings");
  //   }
  //   if (isBookingsError) {
  //     const message = (bookingsError as any)?.message;
  //     toast.error(message || "Error fetching earnings");
  //   }
  // }, [isHotelsError, isBookingsError]);

  return (
    <SectionWrapper customHeaderComponent={<></>}>
      <Tabs defaultValue={type} className="">
        <TabsList className="grid w-full grid-cols-2 sm:max-w-max mx-auto">
          <TabsTrigger value="offerings">Offerings </TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        {/* OFFERINGS */}
        <TabsContent value="offerings">
          <div className="flex-column gap-4 sm:mt-6">
            {isLoading ? (
              <div className="relative h-[50vh] max-h-[300px]">
                <FallbackLoader loading={isLoading} />
              </div>
            ) : (
              <Offerings />
            )}
          </div>
        </TabsContent>

        {/* EARNINGS */}
        <TabsContent value="earnings">
          <div className="flex-column gap-4 mt-6">
            {isLoading ? (
              <div className="relative h-[50vh] max-h-[300px]">
                <FallbackLoader loading={isLoading} />
              </div>
            ) : (
              <Offerings />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </SectionWrapper>
  );
}

export default Main;

// @ts-ignore
const EmptyList = ({ type }: { type: "offerings" | "earnings" }) => {
  const navigate = useNavigate();
  const title = `You have not ${type === "offerings" ? "listed" : "made"} any ${
    type === "offerings" ? "offerings" : "earnings"
  } yet!`;

  const buttonTitle = type === "offerings" ? "List a Hotel" : "Book a Hotel";
  const buttonAction = type === "offerings" ? "/my-offerings/post" : "/listings";

  return (
    <div className="flex-column gap-5 !items-center">
      <NoSearch className="w-fit h-fit" />
      <h2 className="text-xl text-center">{title}</h2>
      <Button
        icon={Plus}
        title={buttonTitle}
        className="group-hover:scale-95 mt-4"
        onClick={() =>
          navigate(buttonAction, {
            state: type === "offerings" ? { type, formType: "post" } : { category: "offerings" },
          })
        }
      />
    </div>
  );
};
