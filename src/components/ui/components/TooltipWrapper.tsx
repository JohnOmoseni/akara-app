import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

function TooltipWrapper({
	trigger,
	content,
}: {
	trigger: ReactNode;
	content: ReactNode;
}) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>{trigger}</TooltipTrigger>
				<TooltipContent className="bg-background border border-border">
					{content}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

export default TooltipWrapper;
