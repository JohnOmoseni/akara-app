interface AsideInfo {
	icon?: any;
	label: string;
	value: string;
	tag?: string;
}

interface ProcessedOffering {
	id: number;
	name: string;
	area: string;
	price_per_unit: string;
	images: string[];
	asideInfo: OfferingAsideInfo[];
}

interface ActiveOffering extends ProcessedOffering {
	number_of_units: number;
	total_amount_worth: number;
}

interface NotificationsType {
	description: any;
	time: string;
	date: string;
	id: string;
}

type CurrentTxnParams = {
	type: "fund" | "withdraw";
	amount: number | null;
} | null;
