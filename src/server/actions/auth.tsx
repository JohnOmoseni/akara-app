import { AxiosResponse } from "axios";
import { handleApiError } from "@/lib/index";
import axiosInstance, { axiosBaseUrl } from "../axios";

const login = async (params: {
	email: string;
	password: string;
	remember?: boolean;
}): Promise<AxiosResponse["data"]> => {
	try {
		const response = await axiosBaseUrl.post(`/auth/login`, params);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const loginWithGoogle = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await axiosBaseUrl.get("/login-with-google");
		console.log("LOGIN WITH GOOGLE RESPONSE", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const register = async (
	params: RegisterUserParams
): Promise<AxiosResponse["data"]> => {
	const { name, email, password } = params;

	const payload = {
		name,
		email,
		password,
		// "g-recaptcha-response": recaptcha
	};

	try {
		const response = await axiosBaseUrl.post(`/auth/register`, payload);
		console.log("REGISTER RESPONSE", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getAuthUser = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await axiosInstance.get("/user");

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const verifyOtp = async (params: {
	otp: number;
	email: string;
}): Promise<AxiosResponse["data"]> => {
	const payload = {
		pin: String(params.otp),
		email: params.email,
	};

	try {
		const response = await axiosInstance.post(`/auth/verify-pin`, payload);

		return response;
	} catch (error) {
		handleApiError(error);
	}
};

const resendOtp = async (params: {
	email: string;
}): Promise<AxiosResponse["data"]> => {
	try {
		const response = await axiosInstance.post(
			`/auth/resend-pin?email=${params.email}`
		);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const forgotPassword = async (params: {
	email: string;
}): Promise<AxiosResponse["data"]> => {
	try {
		const response = await axiosInstance.post("/auth/forgot-password", params);
		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const verifyPasswordPin = async (params: {
	pin: number;
	email: string;
}): Promise<AxiosResponse["data"]> => {
	const payload = {
		pin: params.pin,
		email: params.email,
	};

	try {
		const response = await axiosInstance.post(
			"/auth/forgot-password/verify-pin",
			payload
		);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const resetPassword = async (params: {
	email: string;
	password: string;
	password_confirmation: string;
}): Promise<AxiosResponse["data"]> => {
	try {
		const response = await axiosInstance.post(
			"/auth/forgot-password/reset-password",
			params
		);
		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const logout = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await axiosInstance.post(`/auth/logout`);
		console.log("LOGOUT RESPONSE", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const authApi = {
	login,
	register,
	logout,
	getAuthUser,
	verifyOtp,
	resendOtp,
	forgotPassword,
	verifyPasswordPin,
	resetPassword,
	loginWithGoogle,
};
