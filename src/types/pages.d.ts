interface AsideInfo {
	icon?: any;
	label: string;
	value: string;
}

interface ProcessedOffering {
	name: string;
	area: string;
	images: string[];
	asideInfo: OfferingAsideInfo[];
}

interface NotificationsType {
	description: string;
	time: string;
	date: string;
}
