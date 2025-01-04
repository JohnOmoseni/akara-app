import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN } from "./axios";
import { handleApiError } from "@/lib";

const baseQuery = fetchBaseQuery({
  baseUrl: API_DOMAIN || "",
  // @ts-ignore
  prepareHeaders: (headers, { getState }) => {
    const token = JSON.parse(sessionStorage.getItem("akara-token") || '""');

    token && headers.set("Authorization", `Bearer ${token}`);

    return headers;
  },
});

const customBaseQuery = async (args: any, api: any, extraOptions: any) => {
  try {
    return await baseQuery(args, api, extraOptions);
  } catch (error) {
    const err = error as any;
    const message = err.response?.data?.message || err.message;
    console.error("[REQUEST ERROR RESPONSE]:", message);
    handleApiError(error);

    return Promise.reject(err);
  }
};

export const api = createApi({
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
  reducerPath: "api",
  tagTypes: ["Auth", "Offerings", "Earnings", "Profile"],
});

export default api;
