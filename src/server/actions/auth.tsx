import { AxiosResponse } from "axios";
import { handleApiError } from "@/lib/index";
import axiosInstance, { axiosBaseUrl } from "../axios";
import { RegisterUserParams } from "@/types/api.types";

const login = async (params: {
  email: string;
  password: string;
  remember?: boolean;
}): Promise<AxiosResponse["data"]> => {
  const { email, password, remember } = params || {};

  try {
    const response = await axiosBaseUrl.post(
      `/auth/login?email=${email}&password=${password}&remember=${remember}`,
      params
    );
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

const register = async (params: RegisterUserParams): Promise<AxiosResponse["data"]> => {
  const { name, email, password, recaptcha } = params || {};

  try {
    const response = await axiosBaseUrl.post(
      `/auth/register?name=${name}&email=${email}&password=${password}&g-recaptcha-response=${recaptcha}`,
      params
    );
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
  const { email, otp } = params || {};

  const payload = {
    token: String(params.otp),
    email: params.email,
  };

  try {
    const response = await axiosInstance.post(
      `/auth/verify-pin?email=${email}&pin=${String(otp)}`,
      payload
    );
    console.log("VERIFY OTP RESPONSE", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const resendOtp = async (params: { email: string }): Promise<AxiosResponse["data"]> => {
  try {
    const response = await axiosInstance.get(`/auth/resend-pin?email=${params.email}`);
    console.log("RESEND OTP RESPONSE", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const forgotPassword = async (params: { email: string }): Promise<AxiosResponse["data"]> => {
  try {
    const response = await axiosInstance.post("/password-request", params);
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
    const response = await axiosInstance.post(`/auth/password-reset`, params);
    console.log("RESET PASSWORD RESPONSE", response);

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
  resetPassword,
  loginWithGoogle,
};
