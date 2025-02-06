import api from "../api";

export const profileApiSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		getProfileDetails: builder.query({
			query: () => `/user/profile`,
			transformResponse: (responseData: any) => {
				return responseData?.data;
			},
		}),

		getBankDetails: builder.query({
			query: () => `/user/bank`,
			transformResponse: (responseData: any) => {
				return responseData;
			},
		}),

		getAllTransactions: builder.query({
			query: () => `/user/history`,
			transformResponse: (responseData: any) => {
				return responseData;
			},
		}),

		createBank: builder.mutation({
			query: (bankDetails: CreateBankParams) => ({
				url: "/user/bank/update",
				method: "POST",
				body: bankDetails,
			}),
			invalidatesTags: [{ type: "Profile" }] as any,
		}),

		updateBankInfo: builder.mutation({
			query: (bankDetails: CreateBankParams) => ({
				url: "/user/bank/update",
				method: "POST",
				body: bankDetails,
			}),
			invalidatesTags: [{ type: "Profile" }] as any,
		}),

		updateProfile: builder.mutation({
			query: (profileData: UpdateProfileParams) => ({
				url: "/user/profile/update",
				method: "POST",
				body: profileData,
			}),
			invalidatesTags: [{ type: "Profile" }] as any,
		}),

		updateProfilePicture: builder.mutation({
			query: (formData) => ({
				url: "/user/profile/upload",
				method: "POST",
				body: formData,
			}),
			invalidatesTags: [{ type: "Profile" }] as any,
		}),
	}),
	overrideExisting: false, // To avoid overwriting existing endpoints
});

export const {
	useGetProfileDetailsQuery,
	useGetBankDetailsQuery,
	useGetAllTransactionsQuery,
	useCreateBankMutation,
	useUpdateProfileMutation,
	useUpdateProfilePictureMutation,
	useUpdateBankInfoMutation,
} = profileApiSlice;
