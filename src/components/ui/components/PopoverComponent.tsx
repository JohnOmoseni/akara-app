import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { DotsVertical } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { forwardRef, Fragment, PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren & {
	trigger?: ReactNode;
	triggerStyles?: string;
	list: any[];
	children?: ReactNode;
	containerStyles?: string;
	contentRef?: any;
	renderItem: (item: any, index: number) => ReactNode;
};

export const PopoverComponent = forwardRef<HTMLDivElement, Props>(
	(
		{ list, trigger, renderItem, containerStyles, triggerStyles, contentRef },
		ref
	) => {
		return (
			<Popover>
				<PopoverTrigger ref={ref as any} className={cn(triggerStyles)}>
					{trigger ? trigger : <DotsVertical />}
				</PopoverTrigger>
				<PopoverContent
					ref={contentRef}
					className={cn("popover mr-3", containerStyles)}
				>
					<ul className="flex-column gap-3.5">
						{list &&
							list?.map((item, idx) => (
								<Fragment key={idx}>
									{/* Render dropdown items */}
									{renderItem && renderItem(item, idx)}
								</Fragment>
							))}
						{list.length === 0 && <p className="popover-item">No items</p>}
					</ul>
				</PopoverContent>
			</Popover>
		);
	}
);
