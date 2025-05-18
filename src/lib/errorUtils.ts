/**
 * Extracts a user-friendly error message from an API error response
 * @param error - The error object (e.g., AxiosError, Error, or raw response)
 * @param fallback - Fallback message if no specific message is found
 * @returns A string containing the error message
 */
export function extractErrorMessage(
	error: any,
	fallback: string = "An error occurred"
): string {
	// Handle null or undefined error
	if (!error) return fallback;

	// Handle AxiosError or API response
	const responseData = error.response?.data || error;

	if (responseData) {
		// Common top-level message fields
		// if (typeof responseData.message === "string") {
		// 	return responseData.message;
		// }
		if (typeof responseData.error === "string") {
			return responseData.error;
		}
		if (typeof responseData.errors === "string") {
			return responseData.errors;
		}

		// Handle arrays of errors
		if (Array.isArray(responseData.errors)) {
			return responseData.errors[0] || fallback;
		}

		// Handle object-based errors (e.g., { errors: { field: string[] } })
		if (responseData.errors && typeof responseData.errors === "object") {
			const firstField = Object.keys(responseData.errors)[0];
			if (firstField) {
				const errorValue = responseData.errors[firstField];
				return Array.isArray(errorValue)
					? errorValue[0]
					: errorValue || fallback;
			}
		}
	}

	// Fallback to error.message or generic message
	return error.message || fallback;
}
