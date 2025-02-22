import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handlePayment = async (paymentUrl: string) => {
	try {
		window.location.href = paymentUrl;
	} catch (error: any) {
		const errorMessage = error?.response?.data?.message;
		console.log("PAYMENT ERROR", errorMessage);
	}
};
