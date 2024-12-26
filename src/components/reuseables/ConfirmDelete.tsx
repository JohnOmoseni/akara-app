import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ThreeDots } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  isPending?: boolean;
  trigger: ReactNode;
  title?: string;
  actionTitle?: string;
  actionStyles?: string;
  onDeleteClick: () => void;
};

const ConfirmDelete = ({
  onDeleteClick,
  isPending,
  trigger,
  title,
  actionTitle,
  actionStyles,
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <span className="icon">
            <ThreeDots size={20} />
          </span>
        )}
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-background">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to {title || "delete"}?</AlertDialogTitle>
          <AlertDialogDescription className="">This action is irreversible</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="leading-3" onClick={() => null}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={cn("bg-red-500 leading-3 text-white", actionStyles)}
            onClick={onDeleteClick}
          >
            {isPending ? "Deleting..." : actionTitle || "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDelete;
