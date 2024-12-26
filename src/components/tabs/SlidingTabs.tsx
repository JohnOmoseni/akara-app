import { cn } from "@/lib/utils";
import { TabProps, TabsProps } from "@/types";
import { motion } from "framer-motion";

const Tab = ({ idx, activeTab, tab, changeTab, className }: TabProps) => {
	return (
		<li
			role="tab"
			aria-selected={activeTab === idx ? "true" : "false"}
			className={cn(
				"relative cursor-pointer whitespace-nowrap px-0.5 py-2 pb-2.5 text-center capitalize",
				activeTab === idx
					? "font-semibold text-foreground-variant transition-all"
					: "font-medium text-foreground-100",

				className
			)}
			onClick={() => changeTab(idx)}
		>
			{tab}

			{activeTab === idx && (
				<motion.span
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ ease: "easeIn" }}
					className="absolute bottom-0 left-0 right-0 mx-auto h-[3px] w-full rounded-full bg-secondary shadow-sm"
				/>
			)}
		</li>
	);
};

export const SlidingTabs = ({ activeTab, changeTab, tabIDs }: TabsProps) => {
	return (
		<div className="remove-scrollbar overflow-x-auto">
			<ul
				role="tablist"
				aria-label="Tabs"
				className="row-flex-start gap-6 px-0.5 sm:gap-8 lg:gap-12"
			>
				{tabIDs.map((tab, idx) => {
					return (
						<Tab
							key={idx}
							activeTab={activeTab}
							tab={tab}
							idx={idx}
							changeTab={changeTab}
						/>
					);
				})}
			</ul>
		</div>
	);
};
