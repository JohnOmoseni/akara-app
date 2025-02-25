import api from "../api";

export const transactionApiSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		verifyTransaction: builder.query({
			query: ({ paymentReference }) =>
				`/monnify/callback?paymentReference=${paymentReference}`,
			transformResponse: (responseData: any) => responseData,
		}),

		// MUTATTIONs
		buyOffering: builder.mutation({
			query: (data: BuyOfferingParams) => ({
				url: "/user/offerings/buy",
				method: "POST",
				body: data,
			}),
		}),

		deposit: builder.mutation({
			query: (data: { amount: number }) => ({
				url: "/user/deposit",
				method: "POST",
				body: data,
			}),
		}),

		withdraw: builder.mutation({
			query: (data: { amount: string }) => ({
				url: "/user/withdrawal",
				method: "POST",
				body: data,
			}),
		}),
	}),
	overrideExisting: false, // To avoid overwriting existing endpoints
});

export const {
	useVerifyTransactionQuery,
	useBuyOfferingMutation,
	useWithdrawMutation,
	useDepositMutation,
} = transactionApiSlice;
