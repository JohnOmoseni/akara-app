import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SectionWrapper from "@/layouts/SectionWrapper";
import Offerings from "./Offerings";
import Earnings from "./Earnings";

function Main() {
	const { state } = useLocation();
	const { type } = state || { type: "offerings" };

	return (
		<SectionWrapper customHeaderComponent={<></>}>
			<Tabs defaultValue={type} className="">
				<TabsList className="grid w-full grid-cols-2 sm:max-w-max mx-auto">
					<TabsTrigger value="offerings">Offerings </TabsTrigger>
					<TabsTrigger value="earnings">Earnings</TabsTrigger>
				</TabsList>

				{/* OFFERINGS */}
				<TabsContent value="offerings">
					<div className="flex-column gap-4 sm:mt-6">
						<Offerings />
					</div>
				</TabsContent>

				{/* EARNINGS */}
				<TabsContent value="earnings">
					<div className="flex-column gap-4 mt-6">
						<Earnings />
					</div>
				</TabsContent>
			</Tabs>
		</SectionWrapper>
	);
}

export default Main;

// @ts-ignore
