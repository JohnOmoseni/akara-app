import SectionWrapper from "@/layouts/SectionWrapper";

const Notifications = () => (
  <SectionWrapper mainContainerStyles="sm:pt-8">
    <ul className="flex-column gap-5 max-w-4xl mx-auto">
      {Array.from({ length: 5 }).map((_, idx) => {
        return (
          <li
            key={idx}
            className="flex-column gap-1 pr-1 card !px-3 !py-3 drop-shadow-[0_1px_4px_rgb(0_0_0_/_0.08)]"
          >
            <h4 className="font-semibold"> Commission received</h4>

            <p className="text-sm font-light break-all">
              You have successfully funded your wallet with ₦50,000. Your current wallet balance is
              ₦5,000
            </p>

            <p className="text-xs mt-1 text-grey row-flex-start gap-2 tracking-wide">
              <span className="size-2 bg-grey-100 rounded-full clip-circle" />
              <span>03:40pm - 23 Sept, 2024 | 4mins ago</span>
            </p>
          </li>
        );
      })}
    </ul>
  </SectionWrapper>
);

export default Notifications;
