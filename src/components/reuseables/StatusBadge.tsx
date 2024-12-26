import clsx from "clsx";

import { Status } from "@/types";

export const StatusBadge = ({
  status,
  containerStyles,
}: {
  status: Status;
  containerStyles?: string;
}) => {
  const green = ["Success", "Verified", "Active", "Approved", "Resolved"];
  const error = ["Cancelled", "Failed", "Banned", "Rejected", "Declined"];
  const yellow = ["Suspended", "Pending", "Open"];

  return (
    <div
      className={clsx(
        "row-flex rounded-full bg-blue-200 px-3 py-1.5",
        {
          "bg-green-200": green.includes(status),
          "bg-red-200": error.includes(status),
          "bg-yellow-200": yellow.includes(status),
        },
        containerStyles
      )}
    >
      <p
        className={clsx("whitespace-nowrap text-xs text-blue-500 font-medium !capitalize", {
          "text-green-700": green.includes(status),
          "text-red-600": error.includes(status),
          "text-yellow-600": yellow.includes(status),
        })}
      >
        {status || "Unknown"}
      </p>
    </div>
  );
};
