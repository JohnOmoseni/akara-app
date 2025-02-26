import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import {
	useGetAllEarningsQuery,
	useGetAllOfferingsQuery,
} from "@/server/actions/offerings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SectionWrapper from "@/layouts/SectionWrapper";
import Offerings from "./Offerings";
import Earnings from "./Earnings";
import FallbackLoader from "@/components/fallback/FallbackLoader";

function Main() {
	const { state } = useLocation();
	const { type } = state || { type: "offerings" };

	const {
		data: offerings,
		isFetching,
		isError,
		error,
	} = useGetAllOfferingsQuery({});

	const { data: earnings } = useGetAllEarningsQuery({});

	useEffect(() => {
		if (isError) {
			const message = (error as any)?.message || (error as any)?.data?.message;
			toast.warning(message || "Error fetching offerings");
		}
	}, [isError]);

	if (isFetching) {
		return (
			<SectionWrapper customHeaderComponent={<></>}>
				<div className="loader">
					<FallbackLoader loading />
				</div>
			</SectionWrapper>
		);
	}

	console.log("TEST", earnings, offerings);

	return (
		<SectionWrapper customHeaderComponent={<></>}>
			<Tabs defaultValue={type} className="">
				<TabsList className="grid w-full grid-cols-2 sm:max-w-max mx-auto transition">
					<TabsTrigger value="offerings">Offerings </TabsTrigger>
					<TabsTrigger value="earnings">Earnings</TabsTrigger>
				</TabsList>

				{/* OFFERINGS */}
				<TabsContent value="offerings">
					<div className="flex-column gap-4 sm:mt-6">
						<Offerings offeringsData={offerings} />
					</div>
				</TabsContent>

				{/* EARNINGS */}
				<TabsContent value="earnings">
					<div className="flex-column gap-4 mt-6">
						<Earnings earningsData={earnings} />
					</div>
				</TabsContent>
			</Tabs>
		</SectionWrapper>
	);
}

export default Main;

// @ts-ignore
