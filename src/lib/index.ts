import dayjs from "dayjs";

export const handleApiError = (error: any, message?: string) => {
	console.error(`API Error - ${message}:`, error);
	if (error.response) {
		// Server returned a responnse not in the 200 range
		console.error("Response data:", error.response.data);
		console.error("Response status:", error.response.status);
	} else if (error.request) {
		console.error("Request data:", error.request);
	} else {
		// No response from server - 404
		console.error("Error message:", error.message);
	}
	throw error;
};

export function getInitials(name?: string) {
	if (!name) return "UN";
	return name
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase())
		.join("");
}

export const wait = (ms: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};

export const formatNumber = (value: string | number) => {
	if (value === null || value === undefined) return "0.00";

	// Convert to a number if it's a string with commas
	const numericValue =
		typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;

	if (isNaN(numericValue)) return "0.00"; // Handle invalid numbers safely

	return new Intl.NumberFormat("en-US", {
		style: "decimal",
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	}).format(numericValue);
};

export const formatNumberAsCurrency = (value: string | number) => {
	if (value === null || value === undefined) return "0.00";

	// Convert to a number if it's a string with commas
	const numericValue =
		typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;

	if (isNaN(numericValue)) return "0.00"; // Handle invalid numbers safely

	return new Intl.NumberFormat("en-US", {
		style: "currency",
	}).format(numericValue);
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const formatDate = (date: string | undefined, format: string) =>
	date ? dayjs(date).format(format) : "N/A";

type CSVOptions<T> = {
	headers: string[];
	data: T[];
	filename?: string;
	mapData: (item: T) => (string | number)[];
};

export const exportToCSV = <T>({
	headers,
	data,
	filename = "export",
	mapData,
}: CSVOptions<T>) => {
	if (data.length === 0) return;

	try {
		const csvContent = [
			headers.join(","), // Add headers
			...data.map((item) =>
				mapData(item)
					.map((field) => `"${String(field).replace(/"/g, '""')}"`) // Escape quotes
					.join(",")
			),
		].join("\n");

		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${filename}_${dayjs().format("YYYY-MM-DD")}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	} catch (error) {
		console.error("Error exporting CSV:", error);
	}
};

export function convertToNumber(str: string) {
	return parseFloat(str.replace(/,/g, ""));
}

export const truncateText = (str: string, length: number = 50): string => {
	return str.length > length ? `${str.substring(0, length - 2)}...` : str;
};
