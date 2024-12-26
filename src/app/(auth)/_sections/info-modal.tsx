import Button from "@/components/reuseables/CustomButton";
import { ErrorIcon, SuccessIcon } from "@/constants/icons";
import { cn } from "@/lib/utils";

type InfoModalProps = {
  title: string;
  info: string;
  type: "success" | "error";
  buttonText: string;
  onButtonClick: () => void;
  buttonStyle?: string;
};
function InfoModal({ title, info, type, buttonText, onButtonClick, buttonStyle }: InfoModalProps) {
  return (
    <div className="relative mb-1.5">
      <div className="flex-column items-center gap-5">
        {type === "success" ? (
          <SuccessIcon className="h-fit w-fit sm:w-24" />
        ) : (
          <ErrorIcon className="h-fit w-fit sm:w-24" />
        )}
      </div>

      <div className="flex-column mt-4 items-center gap-2.5">
        <h3 className="text-center text-lg leading-6">{title}</h3>

        <p className="max-w-[40ch] px-2 text-center leading-5 ">{info}</p>
      </div>

      <Button
        onClick={onButtonClick}
        title={buttonText}
        className={cn("mt-6 w-full", buttonStyle)}
      />
    </div>
  );
}

export default InfoModal;
