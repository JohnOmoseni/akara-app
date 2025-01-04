import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import Button from "@/components/reuseables/CustomButton";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import { ArrowDownAlt, ArrowUpAlt, Chatbox } from "@/constants/icons";
import { useAppSelector } from "@/types";

function Offerings() {
  const item: any = [];
  const isError = false;
  const error = null;
  const isFetching = false;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.message || "Error fetching item");
    }
  }, [isError, error]);

  const details = useMemo(() => {
    return {
      name: item?.name || "River Niger Apartment",
      area: item?.address ? `${item.address}` : "Yaba",
      mediaImages: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
      ],
      asideInfo: [
        {
          icon: "",
          label: "Description",
          value:
            item?.description ||
            "A residential block of 2 units of 3 bed room apartment and 2 units of 1 bedroom apartments for a mix of shortlet and normal rental",
        },
        {
          icon: "",
          label: "Location",
          value: item?.address ? `${item.address}` : "11 Adetoun Close, Ogba, Lagos State, Nigeria",
        },
        {
          icon: "",
          label: "Valuation",
          value: item?.valuation || "256,000,000.00",
        },
        {
          icon: "",
          label: "Net Annual Rental Income (Projection)",
          value: item?.valuation || "N/A",
        },
        {
          icon: "",
          label: "Net Annual Appreciation (Projection)",
          value: item?.valuation || "N/A",
        },
        {
          icon: "",
          label: "Co-ownership units available",
          value: item?.valuation || "142,233",
        },
        {
          icon: "",
          label: "Price per unit",
          value: item?.valuation || "1,829/Unit",
        },
        {
          icon: "",
          label: "Current Occupancy Status",
          value: item?.valuation || "Ready for Occupancy",
        },
      ],
    };
  }, [item]);

  return isFetching ? (
    <div className="relative h-[50vh] max-h-[300px]">
      <FallbackLoader loading={isFetching} />
    </div>
  ) : (
    <div className="max-w-7xl relative">
      <div className="card w-full overflow-hidden grid grid-cols-1 sm:grid-cols-[60%_minmax(min-content,40%)] lg:grid-cols-[70%_minmax(min-content,30%)] !items-start gap-8 !p-1 sm:!p-3">
        <section className="flex-column w-full gap-6">
          <div className="relative w-full h-[max(350px,40vh)] sm:h-[500px] rounded-md overflow-hidden">
            <img
              src={details?.mediaImages?.[activeImageIndex]}
              alt=""
              className="w-full h-full object-cover transition-opacity duration-300 nodownload-image"
              style={{ opacity: 0.9 }}
              onContextMenu={(e) => e.preventDefault()}
              draggable="false"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 via-30% pointer-events-none" />

            <div className="absolute px-2.5 pb-3 sm:px-4 sm:pb-4 inset-0 top-auto row-flex-btwn gap-4 pointer-events-none">
              <div className="flex-column flex-1">
                <p className="text-white text-2xl sm:text-3xl capitalize">River Niger Apartment</p>
                <p className="text-white text-base sm:text-xl opacity-80">Yaba</p>
              </div>

              <div className="row-flex gap-2 self-end mb-2 max-w-[50%] overflow-x-auto remove-scrollbar">
                <div className="flex gap-2 px-2">
                  {Array.from({ length: details?.mediaImages?.length }).map((_, index) => (
                    <div
                      key={index}
                      ref={(el) => {
                        if (el) {
                          // Store the element reference
                          const element = el;
                          // Use requestAnimationFrame to ensure DOM is ready
                          requestAnimationFrame(() => {
                            if (activeImageIndex === index) {
                              element.scrollIntoView({
                                behavior: "smooth",
                                block: "nearest",
                                inline: "nearest",
                              });
                            }
                          });
                        }
                      }}
                      className={cn(
                        "size-2 bg-white rounded-full transition-all duration-300",
                        activeImageIndex === index && "bg-secondary scale-105"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-flow-col auto-cols-[7rem] h-20 md:h-28 gap-4 overflow-x-auto snap-x snap-mandatory remove-scrollbar [mask-image:linear-gradient(to_right,transparent,black_0%,black_100%,transparent)] px-[0.3rem]">
            {details?.mediaImages?.map((img, index) => (
              <div
                key={index}
                className={cn(
                  "relative cursor-pointer transition-opacity rounded-md overflow-hidden duration-200"
                )}
                onClick={() => setActiveImageIndex(index)}
              >
                <img
                  src={img}
                  alt={`Image ${index + 1}`}
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                  loading="lazy"
                  className="size-full object-cover nodownload-image"
                />

                {/* Invisible overlay for thumbnails */}
                <div
                  className={cn(
                    "absolute inset-0 bg-transparent/50  select-none",
                    activeImageIndex === index && "opacity-30"
                  )}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            ))}
          </div>
        </section>

        <aside className="w-full space-y-10 sticky sm:self-start my-2">
          <Aside info={details?.asideInfo} />
        </aside>
      </div>
    </div>
  );
}

export default Offerings;

const Aside = ({ info }: { info: any }) => {
  const [expanded, setExpanded] = useState(false);
  const { screenSize } = useAppSelector((state) => state.appState);

  return (
    <>
      <ul className="flex-column gap-4 w-full">
        {info
          ?.slice(0, screenSize < 648 ? (expanded ? info.length : 3) : info?.length)
          .map((item: any, index: number) => (
            <li key={index} className="w-full grid grid-cols-[max-content_1fr] gap-2">
              {item?.icon ? (
                <item.icon className="size-4" />
              ) : (
                <Chatbox className="size-4 mt-1 leading-6" />
              )}

              <p className="text-sm w-full pr-2">
                <span className="capitalize">{item?.label}: </span>

                <span className="text-foreground-100 leading-6 whitespace-pre-line">
                  {item?.value}
                </span>
              </p>
            </li>
          ))}

        {info?.length > 3 && screenSize < 648 && (
          <li
            onClick={() => setExpanded(!expanded)}
            className="text-sm block sm:hidden text-foreground-variant text-end w-max ml-auto font-medium transition-all duration-300"
          >
            {expanded ? (
              <>
                View Less <ArrowUpAlt className="inline size-4" />
              </>
            ) : (
              <>
                Expand <ArrowDownAlt className="inline size-4" />
              </>
            )}
          </li>
        )}
      </ul>

      <div className="row-flex !flex-wrap gap-x-4 gap-y-2">
        <Button
          title="Download details"
          onClick={() => {}}
          className="w-full text-foreground-variant"
          variant={"outline"}
        />

        <Button title="Buy" onClick={() => {}} className="w-full" />
      </div>
    </>
  );
};
