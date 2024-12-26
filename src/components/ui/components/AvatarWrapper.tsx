import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AvatarProps = {
  src?: string;
  fallback?: string;
  containerClassName?: string;
};

function AvatarWrapper({ src, fallback, containerClassName }: AvatarProps) {
  return (
    <Avatar
      className={cn(
        "icon place-items-center leading-none bg-muted shadow transition-all hover:scale-105 overflow-hidden",
        containerClassName,
        !fallback && "blend-image"
      )}
    >
      <AvatarImage src={src || ""} />
      <AvatarFallback className="font-semibold">{fallback ?? "UN"}</AvatarFallback>
    </Avatar>
  );
}

export default AvatarWrapper;
