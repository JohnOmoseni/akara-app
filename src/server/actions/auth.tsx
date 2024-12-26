import { AxiosResponse } from "axios";
import { handleApiError } from "@/lib/index";
import axiosInstance, { axiosBaseUrl } from "../axios";

const login = async (params: {
  email: string;
  password: string;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await axiosBaseUrl.post("/login", params);
    console.log("LOGIN RESPONSE", response);

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

const register = async (params: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await axiosBaseUrl.post("/register", params);
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
    token: String(params.otp),
    email: params.email,
  };

  try {
    const response = await axiosInstance.post("/verify-token", payload);
    console.log("VERIFY OTP RESPONSE", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const resendOtp = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await axiosInstance.get("/resend-otp");
    console.log("RESEND OTP RESPONSE", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const forgotPassword = async (params: { email: string }): Promise<AxiosResponse["data"]> => {
  try {
    const response = await axiosInstance.post("/passwords/request", params);
    console.log("FORGOT PASSWORD RESPONSE", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const resetPassword = async (params: {
  email: string;
  password: string;
  otp: string;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await axiosInstance.post("/passwords/reset", params);
    console.log("RESET PASSWORD RESPONSE", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const logout = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await axiosInstance.post("/logout");
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
  resetPassword,
  loginWithGoogle,
};
