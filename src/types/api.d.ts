// AUTH
interface RegisterUserParams {
	name: string;
	email: string;
	password: string;
	password_confirmation?: string;
	recaptcha?: string | null;
}

interface Offering {
	name: string;
	address: string;
	images: string[];
	description: string;
	location: string;
	valuation: string;
	projected_net_annual_rental_income: string;
	projected_annual_appreciation: string;
	co_ownership_units: string;
	price_per_unit: string;
	occupancy_stage: string;
}

interface OfferingsResponse {
	data: Offering[];
	meta?: {
		page: number;
		per_page: number;
		total: number;
	};
}

interface Earning {
	name: string;
	address: string;
	images: string[];
	description: string;
	location: string;
	valuation: string;
	projected_net_annual_rental_income: string;
	co_ownership_units: string;
	occupancy_stage: string;
}

// PROFILE
interface CreateBankParams {
	bank_name: string;
	acc_name: string;
	acc_number: string;
}

interface VerifyBankParams {
	account_number: string;
	bank_code: string;
}

interface UpdateProfileParams {
	firstname: string;
	lastname: string;
	phone: string;
}
