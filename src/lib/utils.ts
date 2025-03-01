import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import Hashids from "hashids";

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

const SECRET_SALT = import.meta.env.VITE_HASH_SECRET_SALT || "akara-housing";
const hashids = new Hashids(SECRET_SALT, 8); // Minimum length of hash

// Encode offering ID
export const encodeId = (id: number) => {
	try {
		return hashids.encode(id);
	} catch {
		return "";
	}
};

// Decode offering ID
export const decodeId = (hashedId: string) => {
	try {
		const decoded = hashids.decode(hashedId);
		return decoded.length ? decoded[0] : null; // Return null if invalid
	} catch {}
};
