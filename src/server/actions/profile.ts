import api from "../api";

export const profileApiSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		getProfileDetails: builder.query({
			query: () => `/user`,
			transformResponse: (responseData: any) => {
				return responseData?.data;
			},
			providesTags: (_result, _error) =>
				[{ type: "Profile", id: "LIST" }] as any,
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
				return responseData?.bank_info;
			},
		}),

		getAllBanks: builder.query({
			query: () => `/user/bank/list`,
			transformResponse: (responseData: any) => {
				return responseData?.data;
			},
		}),

		getTransactionById: builder.query({
			query: ({ transaction_id }: { transaction_id: string }) =>
				`/user/history/${transaction_id}`,
			keepUnusedDataFor: 0,
			transformResponse: (responseData: any) => {
				return responseData;
			},
			providesTags: (_result, _error, id) => [{ type: "Earnings", id }] as any,
		}),

		// MUTATTIONs
		verifyBank: builder.mutation({
			query: (bankInfo: VerifyBankParams) => ({
				url: "/user/bank/verify",
				method: "POST",
				body: bankInfo,
			}),
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
	useGetAllBanksQuery,

	useGetTransactionByIdQuery,

	useUpdateProfileMutation,
	useUpdateProfilePictureMutation,
	useUpdateBankInfoMutation,
	useVerifyBankMutation,
} = profileApiSlice;
