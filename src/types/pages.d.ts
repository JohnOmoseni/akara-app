interface AsideInfo {
	icon?: any;
	label: string;
	value: string;
	tag?: string;
}

interface ProcessedOffering {
	name: string;
	area: string;
	images: string[];
	amount?: number;
	asideInfo: OfferingAsideInfo[];
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
