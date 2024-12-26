import { cn } from "@/lib/utils";

type Props = {
  emptyTitle?: string;
  emptySubText?: string;
  containerStyles?: string;
};

function EmptyList({ emptySubText, emptyTitle, containerStyles }: Props) {
  return (
    <div
      className={cn(
        "flex-column grid h-[200px] w-full place-items-center gap-2 px-3 py-4",
        containerStyles
      )}
    >
      <h3 className="text-center font-semibold">{emptyTitle || "No content"}</h3>
      <p className="text-center text-sm">{emptySubText}</p>
    </div>
  );
}

export default EmptyList;
